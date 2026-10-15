"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import {
  getDraftById,
  updatePost,
  publishPost,
  getCategories,
} from "@/lib/api";
import { CategorySummary, DraftDetail } from "@/types/api";
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
  CheckCircle,
} from "lucide-react";

interface EditPostClientProps {
  id: string;
}

export function EditPostClient({ id }: EditPostClientProps) {
  const { token } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<DraftDetail | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMd, setContentMd] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [viewMode, setViewMode] = useState<"write" | "preview" | "split">("split");
  const [submitting, setSubmitting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const loadData = useCallback(async () => {
    if (!token || !id) return;
    setLoading(true);
    try {
      const [draftData, categoriesData] = await Promise.all([
        getDraftById(token, id),
        getCategories().catch(() => []),
      ]);

      setDraft(draftData);
      setCategories(categoriesData);

      setTitle(draftData.title);
      setSlug(draftData.slug);
      setSummary(draftData.summary);
      setContentMd(draftData.contentMd);
      setCategorySlug(draftData.categorySlug);
      setCoverImage(draftData.coverImage || "");
      setTagsInput((draftData.tags || []).join(", "));
    } catch (err) {
      console.error("Error loading draft details:", err);
      setFeedback({
        type: "error",
        message: "Não foi possível carregar os detalhes do artigo da API.",
      });
    } finally {
      setLoading(false);
    }
  }, [token, id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const wordsCount = contentMd.trim().split(/\s+/).filter(Boolean).length;
  const estimatedReadingTime = Math.max(1, Math.ceil(wordsCount / 200));

  const handleUpdate = async () => {
    if (!token || !id) return;
    if (!title.trim() || !contentMd.trim() || !categorySlug) {
      setFeedback({
        type: "error",
        message: "Por favor, preencha o título, categoria e conteúdo do artigo.",
      });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

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
        coverImage: coverImage.trim() || null,
        tags,
      };

      await updatePost(token, id, payload);
      setFeedback({
        type: "success",
        message: "Alterações salvas com sucesso!",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Erro ao atualizar o artigo na API .NET 8.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePublish = async () => {
    if (!token || !id) return;
    if (!confirm("Deseja publicar este artigo agora? Ele ficará público no blog.")) {
      return;
    }

    setPublishing(true);
    setFeedback(null);

    try {
      await handleUpdate();
      await publishPost(token, id);
      router.push(`/blog/${slug}`);
    } catch (err) {
      setFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Erro ao publicar o artigo.",
      });
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
        </div>
      </ProtectedRoute>
    );
  }

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
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-zinc-100">
                  Editar Artigo
                </h1>
                {draft && (
                  <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-[11px] font-medium text-yellow-400 border border-yellow-500/20">
                    {draft.status}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {estimatedReadingTime} min de leitura (~{wordsCount} palavras)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View mode toggle */}
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
              disabled={submitting || publishing}
              onClick={handleUpdate}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              <span>Salvar Alterações</span>
            </button>

            {draft?.status !== "Published" && (
              <button
                type="button"
                disabled={submitting || publishing}
                onClick={handlePublish}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors disabled:opacity-50"
              >
                {publishing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                <span>Publicar Artigo</span>
              </button>
            )}
          </div>
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div
            className={`rounded-lg p-3 flex items-start gap-2.5 text-xs border ${
              feedback.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            )}
            <span>{feedback.message}</span>
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
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Slug */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Slug da URL
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
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

            {/* Tags */}
            <div className="lg:col-span-3">
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
              Resumo / Sinopse
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
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
              placeholder="https://..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Content Markdown Area (Split or Single) */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-medium text-zinc-300">
              Conteúdo do Artigo (Markdown)
            </label>
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
