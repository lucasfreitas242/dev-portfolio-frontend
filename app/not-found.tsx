import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 mb-6">
        <FileQuestion className="h-8 w-8 text-emerald-400" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-100">
        404 - Página Não Encontrada
      </h1>

      <p className="mt-3 text-sm text-zinc-400 max-w-md mx-auto">
        O recurso ou artigo que você procura não existe, foi movido ou ainda está em desenvolvimento.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Voltar para o Início</span>
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <span>Ir para o Blog</span>
        </Link>
      </div>
    </div>
  );
}
