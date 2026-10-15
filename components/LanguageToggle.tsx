"use client";

import { useLanguage } from "@/context/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-zinc-800 bg-zinc-900/80 p-0.5 text-xs font-mono backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage("en-US")}
        className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-all ${
          language === "en-US"
            ? "bg-zinc-800 text-emerald-400 font-semibold shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
        title="Switch to English (US)"
      >
        <span className="text-sm leading-none" role="img" aria-label="USA flag">
          🇺🇸
        </span>
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("pt-BR")}
        className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-all ${
          language === "pt-BR"
            ? "bg-zinc-800 text-emerald-400 font-semibold shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
        title="Mudar para Português (Brasil)"
      >
        <span className="text-sm leading-none" role="img" aria-label="Brazil flag">
          🇧🇷
        </span>
        <span>PT</span>
      </button>
    </div>
  );
}
