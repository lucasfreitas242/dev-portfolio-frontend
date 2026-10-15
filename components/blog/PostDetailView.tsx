"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  Languages,
  Tag,
  User,
} from "lucide-react";
import { PostDetail } from "@/types/api";
import { CategoryBadge } from "@/components/CategoryBadge";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useLanguage } from "@/context/LanguageContext";

interface PostDetailViewProps {
  post: PostDetail;
}

export function PostDetailView({ post }: PostDetailViewProps) {
  const { t, language } = useLanguage();

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat(language, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{t.common.backToBlog}</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-10 pb-8 border-b border-zinc-800/80">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <CategoryBadge name={post.categoryName} slug={post.categorySlug} />

          <span className="inline-flex items-center gap-1 rounded bg-zinc-800/60 px-2 py-0.5 font-mono text-[11px] text-zinc-300 border border-zinc-700/50">
            <Languages className="h-3 w-3 text-emerald-400" />
            {post.language.toUpperCase()}
          </span>

          <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
            <Clock className="h-3.5 w-3.5 text-zinc-500" />
            {post.readingTimeMinutes} {t.common.minRead}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-zinc-100 leading-tight">
          {post.title}
        </h1>

        <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
          {post.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-zinc-300 font-medium">{post.authorName}</span>
          </div>

          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-zinc-400" />
              <span>
                {t.common.publishedOn} {formattedDate}
              </span>
            </div>
          )}
        </div>

        {/* Translation Banner if other languages exist */}
        {post.availableTranslations.length > 0 && (
          <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-300">
              <Globe className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{t.blog.alsoAvailableIn}</span>
            </div>

            <div className="flex items-center gap-2">
              {post.availableTranslations.map((trans) => (
                <Link
                  key={trans.slug}
                  href={`/blog/${trans.slug}`}
                  className="font-semibold uppercase tracking-wider underline hover:text-emerald-200"
                >
                  {trans.language}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Markdown Body */}
      <main className="mb-12">
        <MarkdownRenderer content={post.contentMd} />
      </main>

      {/* Tags section */}
      {post.tags && post.tags.length > 0 && (
        <section className="mb-12 border-t border-zinc-800/80 pt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-zinc-500 mr-1" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-mono text-zinc-400 border border-zinc-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Author Card Footer */}
      <footer className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-zinc-200 text-sm">
            {t.blog.aboutAuthor}
          </h4>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            {t.blog.authorBio}
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{t.blog.moreArticles}</span>
        </Link>
      </footer>
    </div>
  );
}
