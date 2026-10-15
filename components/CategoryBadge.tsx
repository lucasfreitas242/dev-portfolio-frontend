import Link from "next/link";

interface CategoryBadgeProps {
  name: string;
  slug: string;
  className?: string;
}

export function CategoryBadge({ name, slug, className = "" }: CategoryBadgeProps) {
  return (
    <Link
      href={`/blog?category=${encodeURIComponent(slug)}`}
      className={`inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors ${className}`}
    >
      {name}
    </Link>
  );
}
