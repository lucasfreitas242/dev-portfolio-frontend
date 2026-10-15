import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

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
    default: "Lucas E. Freitas | Senior Software Engineer & Systems Architect",
  },
  description:
    "Senior Software Engineer specializing in .NET 8, Clean Architecture, Distributed Systems, and Modern Jamstack.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://lucasefreitas.dev"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lucasefreitas.dev",
    siteName: "Lucas E. Freitas - Software Engineer Portfolio & Blog",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-300">
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
