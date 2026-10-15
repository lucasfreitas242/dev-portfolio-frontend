export type Language = "en-US" | "pt-BR";

export interface Dictionary {
  common: {
    blog: string;
    about: string;
    projects: string;
    admin: string;
    viewBlog: string;
    allRightsReserved: string;
    apiStatus: string;
    builtWith: string;
    readMore: string;
    minRead: string;
    publishedOn: string;
    author: string;
    backToBlog: string;
    language: string;
    all: string;
  };
  home: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    exploreArticles: string;
    viewGithub: string;
    viewProjects: string;
    stackTitle: string;
    stackSubtitle: string;
    projectsTitle: string;
    projectsSubtitle: string;
    latestPostsTitle: string;
    latestPostsSubtitle: string;
    viewAllPosts: string;
    noPostsTitle: string;
    noPostsDesc: string;
  };
  blog: {
    title: string;
    subtitle: string;
    allCategories: string;
    filterLanguage: string;
    allLanguages: string;
    pageOf: (page: number, totalPages: number, totalItems: number) => string;
    previous: string;
    next: string;
    noPostsFound: string;
    noPostsFoundDesc: string;
    clearFilters: string;
    readingTime: (min: number) => string;
    alsoAvailableIn: string;
    aboutAuthor: string;
    authorBio: string;
    moreArticles: string;
  };
  projects: Array<{
    title: string;
    desc: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
  }>;
}

export const dictionaries: Record<Language, Dictionary> = {
  "en-US": {
    common: {
      blog: "Blog",
      about: "About",
      projects: "Projects",
      admin: "CMS Admin",
      viewBlog: "View Blog",
      allRightsReserved: "All rights reserved.",
      apiStatus: "API Status: Online",
      builtWith: "Built with .NET 8 Clean Architecture & Headless Next.js 16",
      readMore: "Read article",
      minRead: "min read",
      publishedOn: "Published on",
      author: "By",
      backToBlog: "Back to all articles",
      language: "Language",
      all: "All",
    },
    home: {
      badge: "Software Engineer & Systems Architect",
      heroTitle: "Lucas E. Freitas",
      heroSubtitle:
        "Senior Software Engineer specializing in .NET 8, Clean Architecture, High-Throughput Distributed Systems, and Modern Cloud Infrastructure. Designing resilient, decoupled platforms with zero vendor lock-in.",
      exploreArticles: "Explore Articles",
      viewGithub: "GitHub Profile",
      viewProjects: "Featured Projects",
      stackTitle: "Technical Stack & Engineering Philosophy",
      stackSubtitle:
        "Contract-first architecture guided by OpenAPI v3.0.3, strict separation of concerns, idempotent database migrations, and edge observability.",
      projectsTitle: "Featured Systems & Open-Source Projects",
      projectsSubtitle:
        "Production-grade architectures, real-world systems, and distributed platforms.",
      latestPostsTitle: "Latest Articles & Engineering Insights",
      latestPostsSubtitle:
        "Deep dives into software architecture, .NET performance, database indexing, and DevOps.",
      viewAllPosts: "View all articles",
      noPostsTitle: "No articles published yet",
      noPostsDesc:
        "The headless API is live and ready. New technical articles will appear here automatically via ISR.",
    },
    blog: {
      title: "Articles & Publications",
      subtitle:
        "Practical explorations on Clean Architecture, modern .NET, cloud resilience, databases, and distributed systems design.",
      allCategories: "All",
      filterLanguage: "Language:",
      allLanguages: "All",
      pageOf: (p, totalP, totalI) => `Page ${p} of ${totalP} (${totalI} articles)`,
      previous: "Previous",
      next: "Next",
      noPostsFound: "No articles found",
      noPostsFoundDesc:
        "No articles match your active filter criteria. Try clearing filters to see all publications.",
      clearFilters: "Clear all filters",
      readingTime: (min) => `${min} min read`,
      alsoAvailableIn: "This article is also available in:",
      aboutAuthor: "About the Author: Lucas E. Freitas",
      authorBio:
        "Software Engineer focused on high-scale systems, .NET 8, Clean Architecture, and resilient cloud-native engineering.",
      moreArticles: "More articles",
    },
    projects: [
      {
        title: "Headless Portfolio & Blog Architecture",
        desc: "Decoupled Clean Architecture system featuring a .NET 8 Web API, Supabase PostgreSQL with RLS, Supavisor connection pooling, automated EF Core migration bundles, and Next.js 16 App Router frontend with Partial Prerendering.",
        tags: [".NET 8", "Clean Architecture", "PostgreSQL", "Next.js 16", "Docker", "GHCR", "Cloudflare"],
        githubUrl: "https://github.com/lucasfreitas242/dev-portfolio-blog",
        liveUrl: "https://api.lucasefreitas.dev",
        featured: true,
      },
      {
        title: "Clean Architecture Modular Engine",
        desc: "A production-grade, 3-layer modular architecture implementing CQRS with Vertical Feature Slices, HMAC-SHA256 JWT security, RFC 7807 ProblemDetails, and multi-language post translations.",
        tags: ["C#", "EF Core 8", "Supabase", "RFC 7807", "CI/CD"],
        githubUrl: "https://github.com/lucasfreitas242/dev-portfolio-blog",
        featured: true,
      },
      {
        title: "High-Performance Next.js 16 Jamstack",
        desc: "Turbopack-powered frontend leveraging React 19 Server Components, ISR cache revalidation, client-side BFF proxying, syntax-highlighted Markdown rendering, and dynamic SEO OpenGraph metadata.",
        tags: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "React 19"],
        githubUrl: "https://github.com/lucasfreitas242/dev-portfolio-frontend",
        featured: false,
      },
    ],
  },
  "pt-BR": {
    common: {
      blog: "Blog",
      about: "Sobre",
      projects: "Projetos",
      admin: "CMS Admin",
      viewBlog: "Ver Blog",
      allRightsReserved: "Todos os direitos reservados.",
      apiStatus: "Status da API: Online",
      builtWith: "Construído com .NET 8 Clean Architecture & Next.js 16 Headless",
      readMore: "Ler artigo",
      minRead: "min de leitura",
      publishedOn: "Publicado em",
      author: "Por",
      backToBlog: "Voltar para todos os artigos",
      language: "Idioma",
      all: "Todos",
    },
    home: {
      badge: "Software Engineer & Systems Architect",
      heroTitle: "Lucas E. Freitas",
      heroSubtitle:
        "Engenheiro de Software especializado em .NET 8, Clean Architecture, Sistemas Distribuídos de Alta Escala e Infraestrutura em Nuvem. Projetando plataformas resilientes, desacopladas e seguras.",
      exploreArticles: "Explorar Artigos",
      viewGithub: "Ver GitHub",
      viewProjects: "Projetos em Destaque",
      stackTitle: "Stack Tecnológico & Filosofia de Engenharia",
      stackSubtitle:
        "Arquitetura guiada por contratos estritos (OpenAPI v3.0.3), separação de responsabilidades, migrações de banco idempotentes e observabilidade de borda.",
      projectsTitle: "Sistemas em Destaque & Projetos Open-Source",
      projectsSubtitle:
        "Arquiteturas de produção, sistemas reais e plataformas distribuídas.",
      latestPostsTitle: "Últimos Artigos & Insights de Engenharia",
      latestPostsSubtitle:
        "Estudos práticos, arquitetura de software, performance em .NET, indexação de bancos de dados e DevOps.",
      viewAllPosts: "Ver todos os artigos",
      noPostsTitle: "Nenhum artigo publicado no momento",
      noPostsDesc:
        "A API headless está online e pronta. Novos artigos publicados através do CMS aparecerão automaticamente aqui via ISR.",
    },
    blog: {
      title: "Artigos & Publicações",
      subtitle:
        "Explorações práticas sobre Clean Architecture, .NET moderno, resiliência em nuvem, bancos de dados e design de sistemas.",
      allCategories: "Todas",
      filterLanguage: "Idioma:",
      allLanguages: "Todos",
      pageOf: (p, totalP, totalI) => `Página ${p} de ${totalP} (${totalI} artigos)`,
      previous: "Anterior",
      next: "Próxima",
      noPostsFound: "Nenhum artigo encontrado",
      noPostsFoundDesc:
        "Não foram encontrados artigos com os filtros selecionados. Tente limpar os filtros para ver todas as publicações.",
      clearFilters: "Limpar todos os filtros",
      readingTime: (min) => `${min} min de leitura`,
      alsoAvailableIn: "Este artigo também está disponível em:",
      aboutAuthor: "Sobre o Autor: Lucas E. Freitas",
      authorBio:
        "Engenheiro de Software com foco em sistemas de alta escala, .NET 8, Clean Architecture e arquitetura de microsserviços resilientes.",
      moreArticles: "Mais artigos",
    },
    projects: [
      {
        title: "Arquitetura Headless de Portfólio & Blog",
        desc: "Sistema desacoplado em Clean Architecture contendo Web API em .NET 8, PostgreSQL no Supabase com RLS e pooler Supavisor, bundles idempotentes do EF Core e frontend Next.js 16 App Router com Partial Prerendering.",
        tags: [".NET 8", "Clean Architecture", "PostgreSQL", "Next.js 16", "Docker", "GHCR", "Cloudflare"],
        githubUrl: "https://github.com/lucasfreitas242/dev-portfolio-blog",
        liveUrl: "https://api.lucasefreitas.dev",
        featured: true,
      },
      {
        title: "Motor Modular Clean Architecture",
        desc: "Arquitetura modular em 3 camadas de nível de produção implementando CQRS com Vertical Slicing, segurança JWT com HMAC-SHA256, ProblemDetails RFC 7807 e traduções multi-idioma de artigos.",
        tags: ["C#", "EF Core 8", "Supabase", "RFC 7807", "CI/CD"],
        githubUrl: "https://github.com/lucasfreitas242/dev-portfolio-blog",
        featured: true,
      },
      {
        title: "Jamstack de Alta Performance com Next.js 16",
        desc: "Frontend impulsionado por Turbopack usando React 19 Server Components, revalidação ISR de cache, proxy BFF no cliente, renderizador Markdown com realce de sintaxe e metatags OpenGraph dinâmicas.",
        tags: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "React 19"],
        githubUrl: "https://github.com/lucasfreitas242/dev-portfolio-frontend",
        featured: false,
      },
    ],
  },
};
