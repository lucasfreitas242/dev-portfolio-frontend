"use client";

import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { CategorySummary, PostSummary } from "@/types/api";
import { PostCard } from "@/components/PostCard";
import { useLanguage } from "@/context/LanguageContext";

interface BlogFeedClientProps {
  posts: PostSummary[];
  categories: CategorySummary[];
  totalPages: number;
  totalItems: number;
  page: number;
  category?: string;
  language?: string;
}

export function BlogFeedClient({
  posts,
  categories,
  totalPages,
  totalItems,
  page,
  category,
  language,
}: BlogFeedClientProps) {
  const { t } = useLanguage();

  const buildFilterUrl = (newCategory?: string, newLanguage?: string) => {
    const params = new URLSearchParams();
    const cat = newCategory !== undefined ? newCategory : category;
    const lang = newLanguage !== undefined ? newLanguage : language;

    if (cat) params.set("category", cat);
    if (lang) params.set("language", lang);

    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ""}`;
  };

  const buildPaginationUrl = (targetPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (language) params.set("language", language);
    params.set("page", targetPage.toString());

    return `/blog?${params.toString()}`;
  };

  return (
    <div>
      {/* Page Header */}
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-100">
          {t.blog.title}
        </h1>
        <p className="mt-2 text-zinc-400">
          {t.blog.subtitle}
        </p>
      </div>

      {/* Category & Language Filters */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={buildFilterUrl("", undefined)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !category
                ? "bg-emerald-500 text-zinc-950 font-semibold"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
            }`}
          >
            {t.blog.allCategories}
          </Link>

          {categories.map((cat) => {
            const isActive = category === cat.slug;
            return (
              <Link
                key={cat.id}
                href={buildFilterUrl(isActive ? "" : cat.slug, undefined)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-zinc-950 font-semibold"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
                }`}
              >
                {cat.name} {cat.postCount > 0 && `(${cat.postCount})`}
              </Link>
            );
          })}
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1.5 self-start md:self-auto text-xs">
          <span className="text-zinc-500 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {t.blog.filterLanguage}
          </span>
          <Link
            href={buildFilterUrl(undefined, "")}
            className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
              !language
                ? "bg-zinc-800 text-emerald-400 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {t.blog.allLanguages}
          </Link>
          <Link
            href={buildFilterUrl(undefined, "en-US")}
            className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
              language === "en-US"
                ? "bg-zinc-800 text-emerald-400 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            EN-US
          </Link>
          <Link
            href={buildFilterUrl(undefined, "pt-BR")}
            className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
              language === "pt-BR"
                ? "bg-zinc-800 text-emerald-400 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            PT-BR
          </Link>
        </div>
      </div>

      {/* Articles Feed */}
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-between border-t border-zinc-800 pt-6">
              <div className="text-xs text-zinc-500">
                {t.blog.pageOf(page, totalPages, totalItems)}
              </div>

              <div className="flex items-center gap-2">
                {page > 1 ? (
                  <Link
                    href={buildPaginationUrl(page - 1)}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    {t.blog.previous}
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-zinc-800/40 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-600 cursor-not-allowed">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    {t.blog.previous}
                  </span>
                )}

                {page < totalPages ? (
                  <Link
                    href={buildPaginationUrl(page + 1)}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
                  >
                    {t.blog.next}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-zinc-800/40 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-600 cursor-not-allowed">
                    {t.blog.next}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-16 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-zinc-600 mb-3" />
          <h3 className="text-base font-semibold text-zinc-300">
            {t.blog.noPostsFound}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 max-w-sm mx-auto">
            {t.blog.noPostsFoundDesc}
          </p>

          {(category || language) && (
            <div className="mt-4">
              <Link
                href="/blog"
                className="inline-flex items-center text-xs font-medium text-emerald-400 hover:underline"
              >
                {t.blog.clearFilters}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
