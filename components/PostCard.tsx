import Link from "next/link";
import { Clock, Calendar, ArrowRight, Languages } from "lucide-react";
import { PostSummary } from "@/types/api";
import { CategoryBadge } from "./CategoryBadge";

interface PostCardProps {
  post: PostSummary;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : null;

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-lg hover:shadow-emerald-950/20 ${
        featured ? "md:col-span-2 lg:col-span-2 border-emerald-500/30 bg-zinc-900/60" : ""
      }`}
    >
      <div>
        {/* Meta badges: Category, Language, Reading Time */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <CategoryBadge name={post.categoryName} slug={post.categorySlug} />

          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1 rounded bg-zinc-800/60 px-2 py-0.5 font-mono text-[11px] text-zinc-300 border border-zinc-700/50">
              <Languages className="h-3 w-3 text-emerald-400" />
              {post.language.toUpperCase()}
            </span>

            <span className="inline-flex items-center gap-1 text-zinc-400">
              <Clock className="h-3 w-3 text-zinc-500" />
              {post.readingTimeMinutes} min
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-3">
          {post.summary}
        </p>
      </div>

      {/* Footer info: Date & CTA */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800/50 text-xs text-zinc-500">
        {formattedDate ? (
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-zinc-600" />
            {formattedDate}
          </span>
        ) : (
          <span />
        )}

        <span className="inline-flex items-center gap-1 font-medium text-emerald-400 group-hover:translate-x-1 transition-transform">
          Ler artigo
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}
