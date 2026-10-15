import {
  CategorySummary,
  ListPostsParams,
  PagedResult,
  PostDetail,
  PostSummary,
  ProblemDetails,
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
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

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
