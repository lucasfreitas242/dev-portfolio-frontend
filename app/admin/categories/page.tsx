"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { getCategories, createCategory } from "@/lib/api";
import { CategorySummary } from "@/types/api";
import {
  FolderTree,
  PlusCircle,
  Loader2,
  CheckCircle,
  AlertCircle,
  Hash,
  Star,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug || slug === slugify(name)) {
      setSlug(slugify(val));
    }
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!name.trim()) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      await createCategory(token, {
        name: name.trim(),
        slug: slug.trim() || undefined,
        isFeatured,
      });

      setFeedback({
        type: "success",
        message: `Categoria "${name}" criada com sucesso!`,
      });

      setName("");
      setSlug("");
      setIsFeatured(false);
      await fetchCategories();
    } catch (err) {
      setFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Falha ao criar categoria na API .NET 8.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-zinc-800 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Gerenciamento de Categorias
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Organize a taxonomia de artigos do blog.
          </p>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Category Form */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 h-fit">
            <h2 className="text-base font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-emerald-400" />
              <span>Nova Categoria</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="ex: Microsserviços"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="microsservicos"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-mono text-zinc-300 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-emerald-500 focus:ring-emerald-500"
                />
                <label
                  htmlFor="isFeatured"
                  className="text-xs font-medium text-zinc-300 cursor-pointer"
                >
                  Categoria em Destaque (Featured)
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <PlusCircle className="h-4 w-4" />
                )}
                <span>Cadastrar Categoria</span>
              </button>
            </form>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-2">
            <h2 className="text-base font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <FolderTree className="h-4 w-4 text-emerald-400" />
              <span>Categorias Existentes ({categories.length})</span>
            </h2>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 rounded-xl border border-zinc-800 bg-zinc-900/30 animate-pulse"
                  />
                ))}
              </div>
            ) : categories.length > 0 ? (
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-zinc-200">
                          {cat.name}
                        </span>
                        {cat.isFeatured && (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                            <Star className="h-3 w-3" />
                            Destaque
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-zinc-500">
                        /{cat.slug}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      <Hash className="h-3 w-3 text-emerald-400" />
                      <span>{cat.postCount} artigos</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-12 text-center text-xs text-zinc-500">
                Nenhuma categoria cadastrada ainda. Use o formulário ao lado para criar a primeira.
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
