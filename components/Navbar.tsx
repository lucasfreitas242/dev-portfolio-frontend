import Link from "next/link";
import { BookOpen, Shield } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-base font-bold tracking-tight text-zinc-100 hover:text-emerald-400 transition-colors"
          >
            <span className="text-emerald-400">&gt;</span>
            <span>lucasfreitas.dev</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-zinc-400">
            <Link
              href="/"
              className="hover:text-zinc-100 transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="/#projects"
              className="hover:text-zinc-100 transition-colors"
            >
              Projetos
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            className="md:hidden flex items-center gap-1.5 text-sm text-zinc-300 hover:text-emerald-400 transition-colors px-2 py-1"
          >
            <BookOpen className="h-4 w-4" />
            <span>Blog</span>
          </Link>

          <a
            href="https://github.com/lucasfreitas242"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          <Link
            href="/admin"
            title="Acesso CMS Admin"
            className="rounded-lg p-2 text-zinc-500 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
          >
            <Shield className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
