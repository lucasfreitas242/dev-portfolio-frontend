import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Lucas E. Freitas",
    default: "Lucas E. Freitas | Software Engineer & Systems Architect",
  },
  description:
    "Engenheiro de Software especializado em .NET, Clean Architecture, Microsserviços e Cloud Native.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://lucasefreitas.dev"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lucasefreitas.dev",
    siteName: "Lucas E. Freitas - Dev Portfolio & Blog",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-300">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
