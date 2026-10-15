import { Metadata } from "next";
import { Suspense } from "react";
import { getCategories, getPublishedPosts } from "@/lib/api";
import { BlogFeedClient } from "@/components/blog/BlogFeedClient";

export const metadata: Metadata = {
  title: "Blog & Technical Articles",
  description:
    "Engineering notes, deep dives on Clean Architecture, .NET 8, cloud systems, and distributed design.",
};

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function BlogFeed({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;

  const rawPage = resolvedSearchParams.page;
  const page = typeof rawPage === "string" ? Math.max(1, parseInt(rawPage, 10) || 1) : 1;

  const rawCategory = resolvedSearchParams.category;
  const category = typeof rawCategory === "string" ? rawCategory : undefined;

  const rawLanguage = resolvedSearchParams.language;
  const language = typeof rawLanguage === "string" ? rawLanguage : undefined;

  const pageSize = 9;

  const [postsResult, categories] = await Promise.all([
    getPublishedPosts({ page, pageSize, category, language }).catch(() => ({
      items: [],
      page: 1,
      pageSize,
      totalItems: 0,
      totalPages: 0,
    })),
    getCategories().catch(() => []),
  ]);

  return (
    <BlogFeedClient
      posts={postsResult.items}
      categories={categories}
      totalPages={postsResult.totalPages}
      totalItems={postsResult.totalItems}
      page={page}
      category={category}
      language={language}
    />
  );
}

function BlogFeedSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-full rounded-lg bg-zinc-900 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-64 rounded-xl border border-zinc-800 bg-zinc-900/40 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Suspense fallback={<BlogFeedSkeleton />}>
        <BlogFeed searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
