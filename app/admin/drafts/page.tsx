"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import {
  listDraftPosts,
  publishPost,
  deletePost,
} from "@/lib/api";
import { DraftSummary } from "@/types/api";
import {
  PlusCircle,
  FileText,
  Clock,
  Calendar,
  Send,
  Trash2,
  Edit3,
  Loader2,
  CheckCircle,
  AlertCircle,
  Languages,
} from "lucide-react";

export default function AdminDraftsPage() {
  const { token } = useAuth();
  const [drafts, setDrafts] = useState<DraftSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchDrafts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await listDraftPosts(token, { pageSize: 50 });
      setDrafts(res.items || []);
    } catch (err) {
      console.error("Error loading drafts:", err);
      setFeedback({
        type: "error",
        message: "Falha ao carregar lista de rascunhos da API.",
      });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  const handlePublish = async (id: string, title: string) => {
    if (!token) return;
    if (!confirm(`Deseja realmente publicar o artigo "${title}"? Ele ficará visível publicamente no blog.`)) {
      return;
    }

    setActionLoading(id);
    setFeedback(null);

    try {
      await publishPost(token, id);
      setFeedback({
        type: "success",
        message: `Artigo "${title}" publicado com sucesso!`,
      });
      await fetchDrafts();
    } catch (err) {
      setFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Falha ao publicar o artigo. Tente novamente.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!token) return;
    if (
      !confirm(
        `Tem certeza que deseja excluir o rascunho "${title}"? Esta ação removerá o artigo (soft-delete).`
      )
    ) {
      return;
    }

    setActionLoading(id);
    setFeedback(null);

    try {
      await deletePost(token, id);
      setFeedback({
        type: "success",
        message: `Rascunho "${title}" removido com sucesso.`,
      });
      await fetchDrafts();
    } catch (err) {
      setFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Falha ao excluir o rascunho. Tente novamente.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Rascunhos em Andamento
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              Artigos criados que ainda não foram publicados no feed principal.
            </p>
          </div>

          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Novo Artigo</span>
          </Link>
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

        {/* Drafts List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 rounded-xl border border-zinc-800/80 bg-zinc-900/30 animate-pulse"
              />
            ))}
          </div>
        ) : drafts.length > 0 ? (
          <div className="space-y-4">
            {drafts.map((draft) => {
              const createdDate = new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(draft.createdAt));

              const isItemBusy = actionLoading === draft.id;

              return (
                <div
                  key={draft.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition-colors hover:border-zinc-700"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[11px] font-mono text-zinc-300 border border-zinc-700">
                          {draft.categoryName}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded bg-zinc-800/60 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                          <Languages className="h-3 w-3 text-emerald-400" />
                          {draft.language.toUpperCase()}
                        </span>

                        <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-[11px] font-medium text-yellow-400 border border-yellow-500/20">
                          {draft.status}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                          <Clock className="h-3 w-3" />
                          {draft.readingTimeMinutes} min
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-zinc-100">
                        {draft.title}
                      </h3>

                      <p className="text-xs text-zinc-400 line-clamp-2">
                        {draft.summary}
                      </p>

                      <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                        <Calendar className="h-3 w-3" />
                        <span>Criado em {createdDate}</span>
                        <span className="mx-1">&bull;</span>
                        <span className="font-mono text-zinc-600">
                          slug: /{draft.slug}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <Link
                        href={`/admin/posts/${draft.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-800/60 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Editar</span>
                      </Link>

                      <button
                        onClick={() => handlePublish(draft.id, draft.title)}
                        disabled={isItemBusy}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 transition-colors disabled:opacity-50"
                      >
                        {isItemBusy ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Send className="h-3.5 w-3.5" />
                        )}
                        <span>Publicar</span>
                      </button>

                      <button
                        onClick={() => handleDelete(draft.id, draft.title)}
                        disabled={isItemBusy}
                        title="Excluir rascunho"
                        className="inline-flex items-center justify-center rounded-lg border border-zinc-800 p-2 text-zinc-500 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-16 text-center">
            <FileText className="mx-auto h-10 w-10 text-zinc-600 mb-3" />
            <h3 className="text-base font-semibold text-zinc-300">
              Nenhum rascunho pendente
            </h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto">
              Todos os seus artigos foram publicados ou você ainda não iniciou um novo rascunho.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Começar a escrever</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
