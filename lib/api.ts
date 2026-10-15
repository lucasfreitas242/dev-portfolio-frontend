import {
  CategorySummary,
  CreateCategoryRequest,
  CreatePostRequest,
  DraftDetail,
  DraftSummary,
  ListPostsParams,
  LoginRequest,
  LoginResponse,
  PagedResult,
  PostCreatedResponse,
  PostDetail,
  PostSummary,
  ProblemDetails,
  UpdatePostRequest,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.lucasefreitas.dev";

export class ApiError extends Error {
  public status: number;
  public problemDetails?: ProblemDetails;

  constructor(status: number, message: string, problemDetails?: ProblemDetails) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.problemDetails = problemDetails;
  }
}

async function fetchApi<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url =
    typeof window !== "undefined"
      ? normalizedPath.replace(/^\/api\/v1/, "/api/proxy")
      : `${API_BASE_URL}${normalizedPath}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      let problemDetails: ProblemDetails | undefined;
      let errorMessage = `API Error ${res.status}: ${res.statusText}`;

      try {
        const data = await res.json();
        if (data && typeof data === "object") {
          problemDetails = data as ProblemDetails;
          errorMessage =
            problemDetails.detail ||
            problemDetails.title ||
            errorMessage;
        }
      } catch {
        // Response was not JSON
      }

      throw new ApiError(res.status, errorMessage, problemDetails);
    }

    if (res.status === 204) {
      return {} as T;
    }

    return (await res.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      error instanceof Error ? error.message : "Failed to fetch from API"
    );
  }
}

// ==========================================
// Public Endpoints
// ==========================================

export async function getPublishedPosts(
  params?: ListPostsParams
): Promise<PagedResult<PostSummary>> {
  const query = new URLSearchParams();

  if (params?.page) query.set("page", params.page.toString());
  if (params?.pageSize) query.set("pageSize", params.pageSize.toString());
  if (params?.category) query.set("category", params.category);
  if (params?.language) query.set("language", params.language);

  const queryString = query.toString();
  const path = `/api/v1/posts${queryString ? `?${queryString}` : ""}`;

  return fetchApi<PagedResult<PostSummary>>(path, {
    next: { revalidate: 60, tags: ["posts"] },
  });
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    return await fetchApi<PostDetail>(
      `/api/v1/posts/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 60, tags: [`post-${slug}`, "posts"] },
      }
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getCategories(): Promise<CategorySummary[]> {
  try {
    return await fetchApi<CategorySummary[]>("/api/v1/categories", {
      next: { revalidate: 300, tags: ["categories"] },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<CategorySummary | null> {
  try {
    return await fetchApi<CategorySummary>(
      `/api/v1/categories/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 300, tags: [`category-${slug}`, "categories"] },
      }
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// ==========================================
// Admin / CMS Protected Endpoints
// ==========================================

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  return fetchApi<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function listDraftPosts(
  token: string,
  params?: { page?: number; pageSize?: number }
): Promise<PagedResult<DraftSummary>> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", params.page.toString());
  if (params?.pageSize) query.set("pageSize", params.pageSize.toString());

  const qs = query.toString();
  return fetchApi<PagedResult<DraftSummary>>(
    `/api/v1/posts/drafts${qs ? `?${qs}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
}

export async function getDraftById(
  token: string,
  id: string
): Promise<DraftDetail> {
  return fetchApi<DraftDetail>(`/api/v1/posts/drafts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}

export async function createPost(
  token: string,
  data: CreatePostRequest
): Promise<PostCreatedResponse> {
  return fetchApi<PostCreatedResponse>("/api/v1/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function updatePost(
  token: string,
  id: string,
  data: UpdatePostRequest
): Promise<DraftDetail> {
  return fetchApi<DraftDetail>(`/api/v1/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function publishPost(
  token: string,
  id: string
): Promise<{ id: string; status: string; publishedAt: string }> {
  return fetchApi<{ id: string; status: string; publishedAt: string }>(
    `/api/v1/posts/${id}/publish`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function deletePost(token: string, id: string): Promise<void> {
  return fetchApi<void>(`/api/v1/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createCategory(
  token: string,
  data: CreateCategoryRequest
): Promise<CategorySummary> {
  return fetchApi<CategorySummary>("/api/v1/categories", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
