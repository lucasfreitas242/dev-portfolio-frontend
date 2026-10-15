import { Terminal } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800/80 bg-zinc-950/60 py-10 text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>API Status: Online (api.lucasefreitas.dev)</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-zinc-600">|</span>
            <span>.NET 8 &bull; Next.js 16 &bull; Supabase</span>
            <span className="text-zinc-600">|</span>
            <a
              href="https://github.com/lucasfreitas242"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600 border-t border-zinc-900 pt-6">
          <p>&copy; {CURRENT_YEAR} Lucas E. Freitas. All rights reserved.</p>
          <div className="flex items-center gap-1 font-mono">
            <Terminal className="h-3 w-3 text-emerald-400" />
            <span>Built with Clean Architecture &amp; Headless Blog API</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
