"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  PlusCircle,
  FolderTree,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";

export function AdminHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin/drafts", label: "Rascunhos", icon: FileText },
    { href: "/admin/posts/new", label: "Novo Artigo", icon: PlusCircle },
    { href: "/admin/categories", label: "Categorias", icon: FolderTree },
  ];

  return (
    <div className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Shield className="h-4 w-4" />
            </span>
            <span className="font-mono text-xs font-bold text-zinc-200">
              CMS Admin
            </span>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-800 text-emerald-400 font-semibold"
                      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-medium text-zinc-200">
                {user.name}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {user.email}
              </span>
            </div>
          )}

          <Link
            href="/blog"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1"
          >
            <span>Ver Blog</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          <button
            onClick={logout}
            title="Sair do CMS"
            className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-400 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}
