"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { createPost, getCategories } from "@/lib/api";
import { CategorySummary } from "@/types/api";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Edit,
  Columns,
  Loader2,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function NewPostPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMd, setContentMd] = useState(
    `## Introdução\n\nEscreva a introdução do seu artigo aqui...\n\n### Arquitetura da Solução\n\nDescreva a implementação técnica, padrões adotados e lições aprendidas.\n\n\`\`\`csharp\n// Exemplo de código\npublic record SampleRecord(string Name);\n\`\`\`\n`
  );
  const [categorySlug, setCategorySlug] = useState("");
  const [language, setLanguage] = useState("pt-BR");
  const [translationGroupId, setTranslationGroupId] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [viewMode, setViewMode] = useState<"write" | "preview" | "split">("split");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-slugify helper
  const slugify = (text: string) => {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0 && !categorySlug) {
          setCategorySlug(data[0].slug);
        }
      })
      .catch((e) => console.error("Failed to load categories:", e));
  }, [categorySlug]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === slugify(title)) {
      setSlug(slugify(val));
    }
  };

  const wordsCount = contentMd.trim().split(/\s+/).filter(Boolean).length;
  const estimatedReadingTime = Math.max(1, Math.ceil(wordsCount / 200));

  const handleSubmit = async (publishNow: boolean) => {
    if (!token) return;
    if (!title.trim() || !contentMd.trim() || !categorySlug) {
      setError("Por favor, preencha o título, categoria e conteúdo do artigo.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim() || undefined,
        summary: summary.trim(),
        contentMd,
        categorySlug,
        language,
        translationGroupId: translationGroupId.trim() || undefined,
        coverImage: coverImage.trim() || null,
        tags,
        publishNow,
      };

      const result = await createPost(token, payload);

      if (publishNow) {
        router.push(`/blog/${result.slug}`);
      } else {
        router.push("/admin/drafts");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao salvar o artigo na API .NET 8."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Navigation & Actions Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/drafts"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-800 p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-zinc-100">
                Criar Novo Artigo
              </h1>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {estimatedReadingTime} min de leitura (~{wordsCount} palavras)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View mode buttons */}
            <div className="hidden lg:flex items-center rounded-lg border border-zinc-800 bg-zinc-900 p-1 mr-2 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("write")}
                className={`inline-flex items-center gap-1 rounded px-2.5 py-1 ${
                  viewMode === "write"
                    ? "bg-zinc-800 text-emerald-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Edit className="h-3.5 w-3.5" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("split")}
                className={`inline-flex items-center gap-1 rounded px-2.5 py-1 ${
                  viewMode === "split"
                    ? "bg-zinc-800 text-emerald-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Columns className="h-3.5 w-3.5" />
                <span>Dividido</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className={`inline-flex items-center gap-1 rounded px-2.5 py-1 ${
                  viewMode === "preview"
                    ? "bg-zinc-800 text-emerald-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </button>
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit(false)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              <span>Salvar Rascunho</span>
            </button>

            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              <span>Publicar Imediatamente</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 flex items-start gap-2.5 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Metadata Controls */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Title */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Título do Artigo *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="ex: Microsserviços Resilientes com .NET 8 e Supabase"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Slug */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Slug da URL (gerado automaticamente)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="microsservicos-resilientes-net-8"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-mono text-zinc-300 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Categoria *
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Idioma
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none"
              >
                <option value="pt-BR">Português (pt-BR)</option>
                <option value="en-US">English (en-US)</option>
              </select>
            </div>

            {/* Translation Group ID */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Translation Group ID (Opcional)
              </label>
              <input
                type="text"
                value={translationGroupId}
                onChange={(e) => setTranslationGroupId(e.target.value)}
                placeholder="UUID do grupo de tradução"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="dotnet, clean-architecture, postgres"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Resumo / Sinopse (usado para SEO e cards)
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Uma breve introdução sobre o que o leitor aprenderá neste artigo..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none resize-none"
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              URL da Imagem de Capa (Opcional)
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Content Markdown Area (Split or Single) */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-medium text-zinc-300">
              Conteúdo do Artigo (Markdown com GFM e Sintaxe Highlight)
            </label>
            <span className="text-[11px] font-mono text-zinc-500">
              Markdown Suportado
            </span>
          </div>

          <div
            className={`grid gap-6 ${
              viewMode === "split"
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {/* Editor Input */}
            {(viewMode === "write" || viewMode === "split") && (
              <div>
                <textarea
                  rows={24}
                  value={contentMd}
                  onChange={(e) => setContentMd(e.target.value)}
                  placeholder="Escreva seu artigo em Markdown..."
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            )}

            {/* Live Preview */}
            {(viewMode === "preview" || viewMode === "split") && (
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-6 overflow-y-auto max-h-[600px]">
                <div className="border-b border-zinc-800 pb-3 mb-4">
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    Live Preview
                  </span>
                </div>
                <MarkdownRenderer content={contentMd || "*Conteúdo vazio*"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
