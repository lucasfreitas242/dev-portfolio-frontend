import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Server,
  ShieldCheck,
} from "lucide-react";
import { getPublishedPosts } from "@/lib/api";
import { PostCard } from "@/components/PostCard";

export default async function Home() {
  let posts: any[] = [];
  try {
    const data = await getPublishedPosts({ pageSize: 4 });
    posts = data.items || [];
  } catch (error) {
    console.error("Failed to load initial posts:", error);
  }

  const techStack = [
    {
      category: "Backend & Runtime",
      items: [
        { name: ".NET 8 / C#", desc: "Clean Architecture & Minimal APIs" },
        { name: "EF Core 8", desc: "Code-First, Idempotent Bundles" },
        { name: "PostgreSQL", desc: "Supabase Pooler & RLS" },
      ],
      icon: Server,
    },
    {
      category: "Frontend & Jamstack",
      items: [
        { name: "Next.js 16 (App Router)", desc: "Server Components & ISR" },
        { name: "TypeScript & React 19", desc: "End-to-End Type Safety" },
        { name: "Tailwind CSS v4", desc: "Typography & Modern Styling" },
      ],
      icon: Code2,
    },
    {
      category: "Cloud & DevOps",
      items: [
        { name: "Docker & GHCR", desc: "Multi-stage non-root containers" },
        { name: "GitHub Actions", desc: "CI/CD com testes e auto-deploy" },
        { name: "Cloudflare & Render", desc: "Edge proxy, SSL Full & CDN" },
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
            <span>Software Engineer &amp; Systems Architect</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-100">
            Lucas E. Freitas
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-zinc-400 leading-relaxed">
            Construo plataformas robustas, escaláveis e resilientes combinando o
            poder do ecossistema <span className="text-zinc-100 font-semibold">.NET 8</span>,{" "}
            <span className="text-zinc-100 font-semibold">Clean Architecture</span> e{" "}
            <span className="text-zinc-100 font-semibold">Next.js</span>. Focado em qualidade de código,
            segurança em camadas e automação contínua.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Explorar Artigos</span>
            </Link>

            <a
              href="https://github.com/lucasfreitas242"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              <span>Ver GitHub</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="py-12 border-t border-zinc-800/80">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            Stack Tecnológico &amp; Filosofia de Engenharia
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Arquitetura desacoplada guiada por contratos estritos (OpenAPI), separação de responsabilidades e observabilidade.
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

      {/* Latest Blog Posts */}
      <section className="py-12 border-t border-zinc-800/80">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
              Últimos Artigos &amp; Insights
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Estudos práticos, arquitetura de software, DevOps e melhores práticas.
            </p>
          </div>

          <Link
            href="/blog"
            className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <span>Ver todos</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, idx) => (
              <PostCard key={post.id} post={post} featured={idx === 0} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-zinc-600 mb-3" />
            <h3 className="text-base font-semibold text-zinc-300">
              Nenhum artigo publicado no momento
            </h3>
            <p className="mt-1 text-sm text-zinc-500 max-w-md mx-auto">
              A API está online e pronta. Novos artigos publicados através do CMS headless aparecerão automaticamente aqui via ISR.
            </p>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <span>Ver todos os artigos</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
