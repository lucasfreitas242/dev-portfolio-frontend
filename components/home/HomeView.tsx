"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  ExternalLink,
  FolderGit2,
  Layers,
  Server,
  Star,
} from "lucide-react";
import { PostSummary } from "@/types/api";
import { PostCard } from "@/components/PostCard";
import { useLanguage } from "@/context/LanguageContext";
import { GithubIcon } from "@/components/icons/SocialIcons";

interface HomeViewProps {
  initialPosts: PostSummary[];
}

export function HomeView({ initialPosts }: HomeViewProps) {
  const { t, language } = useLanguage();

  const techStack = [
    {
      category: language === "en-US" ? "Backend & Cloud Core" : "Backend & Runtime",
      items: [
        { name: ".NET 8 / C#", desc: language === "en-US" ? "Clean Architecture & Minimal APIs" : "Clean Architecture & Minimal APIs" },
        { name: "EF Core 8", desc: language === "en-US" ? "Code-First, Idempotent Bundles" : "Code-First, Bundles Idempotentes" },
        { name: "PostgreSQL", desc: language === "en-US" ? "Supabase Pooler & Row Level Security" : "Supabase Pooler & RLS Ativo" },
      ],
      icon: Server,
    },
    {
      category: language === "en-US" ? "Frontend & Modern Web" : "Frontend & Jamstack",
      items: [
        { name: "Next.js 16 (App Router)", desc: language === "en-US" ? "Server Components & ISR" : "Server Components & ISR" },
        { name: "TypeScript & React 19", desc: language === "en-US" ? "End-to-End Type Safety" : "Tipagem Estrita Ponta a Ponta" },
        { name: "Tailwind CSS v4", desc: language === "en-US" ? "Typography & Responsive Dark Theme" : "Tipografia & Dark Theme Moderno" },
      ],
      icon: Code2,
    },
    {
      category: language === "en-US" ? "DevOps & Cloud Native" : "Cloud & DevOps",
      items: [
        { name: "Docker & GHCR", desc: language === "en-US" ? "Multi-stage non-root containers" : "Containers multi-stage non-root" },
        { name: "GitHub Actions", desc: language === "en-US" ? "Automated CI/CD with testing & deploy" : "CI/CD com testes e auto-deploy" },
        { name: "Cloudflare & Render", desc: language === "en-US" ? "Edge DNS, Full/Strict SSL & CDN" : "Edge proxy, SSL Full & CDN" },
      ],
      icon: Layers,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero Section */}
      <section className="relative pb-16 pt-6 sm:pb-24 sm:pt-10">
        <div className="flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{t.home.badge}</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-100">
            {t.home.heroTitle}
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-zinc-400 leading-relaxed">
            {t.home.heroSubtitle}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>{t.home.exploreArticles}</span>
            </Link>

            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              <FolderGit2 className="h-4 w-4 text-emerald-400" />
              <span>{t.home.viewProjects}</span>
            </Link>

            <a
              href="https://github.com/lucasfreitas242"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span>{t.home.viewGithub}</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="py-12 border-t border-zinc-800/80">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            {t.home.stackTitle}
          </h2>
          <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
            {t.home.stackSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techStack.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-zinc-200 text-sm">
                    {group.category}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="border-b border-zinc-800/40 pb-2 last:border-b-0 last:pb-0"
                    >
                      <div className="font-mono text-xs font-semibold text-zinc-300">
                        {item.name}
                      </div>
                      <div className="text-xs text-zinc-500">{item.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-12 border-t border-zinc-800/80 scroll-mt-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            {t.home.projectsTitle}
          </h2>
          <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
            {t.home.projectsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.map((proj) => (
            <div
              key={proj.title}
              className={`flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70 ${
                proj.featured ? "border-emerald-500/30 bg-zinc-900/60" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-medium">
                    <FolderGit2 className="h-4 w-4" />
                    <span>Project</span>
                  </div>

                  {proj.featured && (
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
                  {proj.title}
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                  {proj.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/50">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-zinc-800/80 px-2 py-0.5 font-mono text-[10px] text-zinc-300 border border-zinc-700/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-emerald-400 transition-colors"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>Code</span>
                    </a>
                  )}

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-emerald-400 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live API</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-12 border-t border-zinc-800/80">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
              {t.home.latestPostsTitle}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {t.home.latestPostsSubtitle}
            </p>
          </div>

          <Link
            href="/blog"
            className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <span>{t.home.viewAllPosts}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {initialPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initialPosts.map((post, idx) => (
              <PostCard key={post.id} post={post} featured={idx === 0} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-zinc-600 mb-3" />
            <h3 className="text-base font-semibold text-zinc-300">
              {t.home.noPostsTitle}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 max-w-md mx-auto">
              {t.home.noPostsDesc}
            </p>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <span>{t.home.viewAllPosts}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
