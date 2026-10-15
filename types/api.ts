export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  language: string;
  summary: string;
  coverImage: string | null;
  readingTimeMinutes: number;
  publishedAt: string | null;
  categoryName: string;
  categorySlug: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PostTranslation {
  language: string;
  slug: string;
}

export interface PostDetail {
  id: string;
  title: string;
  slug: string;
  language: string;
  translationGroupId: string;
  summary: string;
  contentMd: string;
  coverImage: string | null;
  readingTimeMinutes: number;
  publishedAt: string | null;
  authorName: string;
  categoryName: string;
  categorySlug: string;
  tags: string[];
  availableTranslations: PostTranslation[];
}

export interface CategorySummary {
  id: string;
  name: string;
  slug: string;
  isFeatured: boolean;
  postCount: number;
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  instance?: string;
  traceId?: string;
  errors?: Record<string, string[]>;
}

export interface ListPostsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  language?: string;
}

// ==========================================
// Admin / CMS Contracts
// ==========================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  email: string;
  name: string;
}

export interface DraftSummary {
  id: string;
  title: string;
  slug: string;
  language: string;
  summary: string;
  coverImage: string | null;
  readingTimeMinutes: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  categorySlug: string;
}

export interface DraftDetail {
  id: string;
  title: string;
  slug: string;
  language: string;
  translationGroupId: string;
  summary: string;
  contentMd: string;
  coverImage: string | null;
  readingTimeMinutes: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  categoryName: string;
  categorySlug: string;
  tags: string[];
}

export interface CreatePostRequest {
  title: string;
  summary: string;
  contentMd: string;
  categoryId?: string;
  categorySlug?: string;
  slug?: string;
  language?: string;
  translationGroupId?: string;
  coverImage?: string | null;
  tags?: string[];
  publishNow?: boolean;
}

export interface UpdatePostRequest {
  title: string;
  summary: string;
  contentMd: string;
  categoryId?: string;
  categorySlug?: string;
  slug?: string;
  coverImage?: string | null;
  tags?: string[];
}

export interface PostCreatedResponse {
  id: string;
  slug: string;
  language: string;
  translationGroupId: string;
  status: string;
  createdAt: string;
  publishedAt: string | null;
}

export interface CreateCategoryRequest {
  name: string;
  slug?: string;
  isFeatured?: boolean;
}
