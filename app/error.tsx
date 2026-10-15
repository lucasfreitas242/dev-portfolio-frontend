"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-zinc-100">
        Ocorreu um erro ao carregar esta página
      </h1>

      <p className="mt-2 text-sm text-zinc-400 max-w-md mx-auto">
        Não foi possível comunicar com o serviço ou renderizar os dados. Tente novamente em instantes.
      </p>

      <div className="mt-6">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          <span>Tentar Novamente</span>
        </button>
      </div>
    </div>
  );
}
