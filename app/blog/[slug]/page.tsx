import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostBySlug } from "@/lib/api";
import { PostDetailView } from "@/components/blog/PostDetailView";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: BlogPostPageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article does not exist or has been removed.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lucasefreitas.dev";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: postUrl,
      languages: post.availableTranslations.reduce<Record<string, string>>(
        (acc, trans) => {
          acc[trans.language] = `${siteUrl}/blog/${trans.slug}`;
          return acc;
        },
        {}
      ),
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      authors: [post.authorName],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

async function PostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetailView post={post} />;
}

function PostSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-6">
      <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
      <div className="h-10 w-3/4 bg-zinc-800 rounded animate-pulse" />
      <div className="h-5 w-1/2 bg-zinc-800 rounded animate-pulse" />
      <div className="h-64 w-full bg-zinc-900/50 rounded-xl animate-pulse" />
    </div>
  );
}

export default function BlogPostPage(props: BlogPostPageProps) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostContent params={props.params} />
    </Suspense>
  );
}
