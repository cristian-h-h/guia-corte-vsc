import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "..", "dist");
const templatePath = path.join(distDir, "index.html");
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseReadKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";
const BASE_URL = "https://www.guiadecorte.cl";
const DEFAULT_SOCIAL_IMAGE = `${BASE_URL}/social/profix-126-share.jpg`;
const DEFAULT_APP_ICON = `${BASE_URL}/icons/apple-touch-icon.png`;

if (!supabaseUrl || !supabaseReadKey) {
  throw new Error("Faltan credenciales de Supabase para prerender del blog.");
}

const supabase = createClient(supabaseUrl, supabaseReadKey);

const PLACEHOLDER_TITLES = new Set(["Título por defecto"]);
const PLACEHOLDER_PATTERNS = [
  /contenido del artículo en desarrollo/i,
  /próximamente publicaremos/i,
];
const IMAGE_URL_REPLACEMENTS = new Map([
  ["https://www.guiadecorte.cl/blog-imagenes/cortes-perfectos-guia.webp", "https://www.guiadecorte.cl/guia-imagenes/corte-sierra-circular-profix-126.webp"],
  ["https://www.guiadecorte.cl/blog-imagenes/proyectos-principiantes.webp", "https://www.guiadecorte.cl/guia-imagenes/guia-corte-profix-126.webp"],
  ["https://www.guiadecorte.cl/blog-imagenes/mantenimiento-herramientas.webp", "https://www.guiadecorte.cl/guia-imagenes/ajuste-recto-profix-126.webp"],
]);

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripQueryParams = (value = "") => String(value).split("?")[0];
const isSocialFriendlyImage = (value = "") => /\.(png|jpe?g)$/i.test(stripQueryParams(value));
const resolveSocialImage = (value = "") => isSocialFriendlyImage(value) ? value : DEFAULT_SOCIAL_IMAGE;

const hasMeaningfulString = (value, minLength = 120) => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return trimmed.length >= minLength && !PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(trimmed));
};

const hasMeaningfulPortableText = (value) => {
  if (!Array.isArray(value) || value.length === 0) return false;

  const text = value
    .flatMap((block) => Array.isArray(block?.children) ? block.children : [])
    .map((child) => child?.text || "")
    .join(" ")
    .trim();

  return hasMeaningfulString(text, 120);
};

const parseContent = (content) => {
  if (typeof content !== "string" || !content.trim()) {
    return content;
  }

  const trimmed = content.trim();
  if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && (trimmed.endsWith("}") || trimmed.endsWith("]"))) {
    try {
      return JSON.parse(content);
    } catch {
      return content;
    }
  }

  return content;
};

const normalizeImageUrl = (value) => {
  if (typeof value !== "string" || !value.trim()) return "";
  return IMAGE_URL_REPLACEMENTS.get(value.trim()) || value.trim();
};

const isIndexableBlog = (blog) => {
  if (!blog?.slug || !blog?.title || PLACEHOLDER_TITLES.has(blog.title) || blog.is_published === false) {
    return false;
  }

  return (
    hasMeaningfulPortableText(blog.content) ||
    hasMeaningfulString(blog.content) ||
    hasMeaningfulString(blog.excerpt, 140)
  );
};

const transformBlog = (blog) => ({
  _id: blog.id,
  title: blog.title,
  slug: blog.slug,
  excerpt: blog.excerpt,
  content: parseContent(blog.content),
  imageUrl: normalizeImageUrl(blog.image_url),
  publishedAt: blog.published_at,
  author: blog.author || "Equipo GuiaDeCorte.cl",
  tags: Array.isArray(blog.tags) ? blog.tags : [],
  metaTitle: blog.meta_title,
  metaDescription: blog.meta_description,
  category: blog.category || "Carpintería",
});

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const stripManagedHead = (template) =>
  template
    .replace(/<title[^>]*>[\s\S]*?<\/title>/i, "")
    .replace(/<meta[^>]*data-rh="true"[^>]*>/gi, "")
    .replace(/<meta[^>]+(?:name|property)=["'](?:description|keywords|author|robots|viewport|theme-color|twitter:[^"']+|msapplication-TileColor|msapplication-TileImage)["'][^>]*>/gi, "")
    .replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<link[^>]*data-rh="true"[^>]*>/gi, "")
    .replace(/<link[^>]+rel=["'](?:canonical|manifest|apple-touch-icon|icon|shortcut icon)["'][^>]*>/gi, "")
    .replace(/<script[^>]*data-rh="true"[\s\S]*?<\/script>/gi, "")
    .replace(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\s*<!--app-head-->\s*/gi, "\n");

const injectPage = (template, headContent, bodyHtml) => {
  const cleanTemplate = stripManagedHead(template);
  const htmlWithHead = cleanTemplate.replace("</head>", `${headContent}\n  </head>`);

  return htmlWithHead.replace(
    /<div id="root">[\s\S]*?<\/div>(\s*<!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->)/,
    `<div id="root" data-render-mode="replace">${bodyHtml}</div>$1`
  );
};

const renderPortableText = (blocks) => {
  if (!Array.isArray(blocks)) return "";

  return blocks.map((block) => {
    if (block?._type !== "block") return "";

    const text = (block.children || []).map((child) => escapeHtml(child.text || "")).join("");
    if (!text.trim()) return "";

    if (block.listItem) {
      return `<li>${text}</li>`;
    }

    switch (block.style) {
      case "h1":
        return `<h1 class="text-3xl md:text-4xl font-bold mb-6">${text}</h1>`;
      case "h2":
        return `<h2 class="text-2xl md:text-3xl font-bold mt-10 mb-6 pb-3 border-b-2 border-naranja-300">${text}</h2>`;
      case "h3":
        return `<h3 class="text-xl font-bold mt-8 mb-4 text-madera-800">${text}</h3>`;
      default:
        return `<p class="mb-6 text-gris-700 leading-relaxed text-lg">${text}</p>`;
    }
  }).join("");
};

const renderStringContent = (content) => {
  if (typeof content !== "string" || !content.trim()) return "";
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return content;
  }

  return content
    .split(/\n\s*\n/)
    .map((paragraph) => `<p class="mb-6 text-gris-700 leading-relaxed text-lg">${escapeHtml(paragraph.trim())}</p>`)
    .join("");
};

const renderContent = (content, excerpt) => {
  if (Array.isArray(content) && content.length > 0) {
    return renderPortableText(content);
  }

  if (typeof content === "string" && content.trim()) {
    return renderStringContent(content);
  }

  return `<p class="mb-6 text-gris-700 leading-relaxed text-lg">${escapeHtml(excerpt || "")}</p>`;
};

const renderBlogIndex = (posts) => {
  const featured = posts[0];
  const rest = posts.slice(1);

  return `
    <main class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">Blog de Carpintería y Corte Recto</h1>
        <p class="text-gris-600 max-w-3xl mx-auto">
          Artículos para carpinteros, mueblistas, instaladores y aficionados avanzados que buscan mejorar cortes,
          compatibilidad de herramientas y terminación usando la ProFix 126 y sistemas de trabajo similares.
        </p>
      </div>
      <article class="mb-12 bg-white rounded-lg shadow-md overflow-hidden">
        <div class="lg:flex">
          <div class="lg:w-1/2">
            <img src="${escapeHtml(featured.imageUrl)}" alt="${escapeHtml(featured.title)}" class="w-full h-full object-cover object-center" />
          </div>
          <div class="lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <div class="flex items-center text-sm text-gris-500 mb-3">
              <span class="bg-naranja-100 text-naranja-600 rounded-full px-3 py-1">${escapeHtml(featured.category)}</span>
              <span class="mx-2">•</span>
              <span>${escapeHtml(formatDate(featured.publishedAt))}</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold mb-4">${escapeHtml(featured.title)}</h2>
            <p class="text-gris-600 mb-6">${escapeHtml(featured.excerpt)}</p>
            <div><a href="/blog/${escapeHtml(featured.slug)}" class="inline-flex items-center gap-2 bg-herramienta-600 hover:bg-herramienta-700 text-white px-5 py-3 rounded-md font-medium">Leer artículo completo</a></div>
          </div>
        </div>
      </article>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${rest.map((post) => `
          <article class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="aspect-video overflow-hidden">
              <img src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.title)}" class="w-full h-full object-cover object-center" />
            </div>
            <div class="p-6">
              <div class="flex items-center text-sm text-gris-500 mb-3">
                <span class="bg-naranja-50 text-naranja-600 rounded-full px-3 py-1">${escapeHtml(post.category)}</span>
                <span class="mx-2">•</span>
                <span>${escapeHtml(formatDate(post.publishedAt))}</span>
              </div>
              <h3 class="text-xl font-bold mb-3">${escapeHtml(post.title)}</h3>
              <p class="text-gris-600 mb-4">${escapeHtml(post.excerpt)}</p>
              <a href="/blog/${escapeHtml(post.slug)}" class="text-naranja-600 font-medium hover:text-naranja-700">Leer artículo completo</a>
            </div>
          </article>
        `).join("")}
      </div>
    </main>
  `;
};

const buildBlogIndexSchema = () =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/blog#blog`,
    url: `${BASE_URL}/blog`,
    name: "Blog de Carpintería y Corte Recto",
    description:
      "Consejos, tutoriales y análisis para carpintería, corte recto, sierra circular, router y uso profesional de la ProFix 126.",
    publisher: {
      "@type": "Organization",
      name: "GuiaDeCorte.cl",
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_APP_ICON,
      },
    },
    inLanguage: "es-CL",
  });

const buildBlogPostingSchema = (post) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.imageUrl || DEFAULT_SOCIAL_IMAGE,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "GuiaDeCorte.cl",
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_APP_ICON,
      },
    },
    description: post.metaDescription || post.excerpt,
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    inLanguage: "es-CL",
  });

const renderArticle = (post, relatedPosts) => {
  const articleContent = renderContent(post.content, post.excerpt);
  const relatedHtml = relatedPosts.length
    ? `
      <section class="border-t pt-8 mt-12">
        <h3 class="text-xl font-bold mb-6">Artículos relacionados</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${relatedPosts.map((related) => `
            <a href="/blog/${escapeHtml(related.slug)}" class="group block bg-white rounded-lg shadow-sm overflow-hidden">
              ${related.imageUrl ? `<div class="aspect-video overflow-hidden"><img src="${escapeHtml(related.imageUrl)}" alt="${escapeHtml(related.title)}" class="w-full h-full object-cover" /></div>` : ""}
              <div class="p-4">
                <h4 class="font-medium">${escapeHtml(related.title)}</h4>
                <p class="text-sm text-gris-500 mt-1">${escapeHtml(formatDate(related.publishedAt))}</p>
              </div>
            </a>
          `).join("")}
        </div>
      </section>
    `
    : "";

  return `
    <main class="container mx-auto px-4 py-12">
      <div class="max-w-3xl mx-auto">
        <a href="/blog" class="inline-flex items-center text-naranja-600 hover:text-naranja-700 mb-8">Volver al blog</a>
        <div class="mb-8">
          <div class="flex items-center text-sm text-gris-500 mb-3">
            <span class="bg-naranja-100 text-naranja-600 rounded-full px-3 py-1">${escapeHtml(post.category)}</span>
            <span class="mx-2">•</span>
            <span>${escapeHtml(formatDate(post.publishedAt))}</span>
            <span class="mx-2">•</span>
            <span>Por ${escapeHtml(post.author)}</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold mb-6">${escapeHtml(post.title)}</h1>
        </div>
        ${post.imageUrl ? `<div class="mb-8"><img src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.title)}" class="w-full h-auto rounded-lg shadow-md" /></div>` : ""}
        <article class="prose prose-lg md:prose-xl max-w-none mb-12">${articleContent}</article>
        ${post.tags.length ? `<div class="border-t border-b py-6 mb-12"><div class="flex flex-wrap gap-2">${post.tags.map((tag) => `<span class="bg-gris-100 text-gris-700 px-3 py-1 rounded-full text-sm">#${escapeHtml(tag)}</span>`).join("")}</div></div>` : ""}
        ${relatedHtml}
      </div>
    </main>
  `;
};

const buildHead = ({
  title,
  description,
  canonical,
  keywords = "",
  image = "",
  schema = "",
  ogType = "article",
}) => {
  const socialImage = resolveSocialImage(image);
  const usesDefaultSocialImage = socialImage === DEFAULT_SOCIAL_IMAGE;

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    ${keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}" />` : ""}
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#FF6600" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="${escapeHtml(ogType)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(socialImage)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(socialImage)}" />
    ${usesDefaultSocialImage ? '<meta property="og:image:type" content="image/jpeg" />' : ""}
    ${usesDefaultSocialImage ? '<meta property="og:image:width" content="1200" />' : ""}
    ${usesDefaultSocialImage ? '<meta property="og:image:height" content="630" />' : ""}
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta property="og:site_name" content="GuiaDeCorte.cl" />
    <meta property="og:locale" content="es_CL" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${escapeHtml(canonical)}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(socialImage)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(title)}" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
    <meta name="msapplication-TileImage" content="${escapeHtml(DEFAULT_APP_ICON)}" />
    <meta name="msapplication-TileColor" content="#FF6600" />
    ${schema ? `<script type="application/ld+json">${schema}</script>` : ""}
  `;
};

async function loadBlogs() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data.filter(isIndexableBlog).map(transformBlog);
}

async function prerenderBlog() {
  const template = fs.readFileSync(templatePath, "utf-8");
  const posts = await loadBlogs();

  if (!posts.length) {
    console.log("No hay posts publicables para prerenderizar.");
    return;
  }

  const blogIndexHead = buildHead({
    title: "Blog de Carpintería y Corte Recto | GuiaDeCorte.cl",
    description: "Consejos, tutoriales y análisis para carpintería, corte recto, sierra circular, router y uso profesional de la ProFix 126.",
    canonical: `${BASE_URL}/blog`,
    keywords: "blog carpintería, guía de corte, sierra circular, router, profix 126",
    schema: buildBlogIndexSchema(),
    ogType: "website",
  });
  const blogIndexHtml = injectPage(template, blogIndexHead, renderBlogIndex(posts));
  const blogDir = path.join(distDir, "blog");
  ensureDir(blogDir);
  fs.writeFileSync(path.join(blogDir, "index.html"), blogIndexHtml, "utf-8");
  console.log("Prerender OK: /blog");

  posts.forEach((post) => {
    const related = posts.filter((candidate) => candidate.slug !== post.slug).slice(0, 3);
    const articleHead = buildHead({
      title: `${post.metaTitle || post.title} | GuiaDeCorte.cl`,
      description: post.metaDescription || post.excerpt,
      canonical: `${BASE_URL}/blog/${post.slug}`,
      keywords: post.tags.join(", "),
      image: post.imageUrl,
      schema: buildBlogPostingSchema(post),
      ogType: "article",
    });

    const articleHtml = injectPage(template, articleHead, renderArticle(post, related));
    const articleDir = path.join(distDir, "blog", post.slug);
    ensureDir(articleDir);
    fs.writeFileSync(path.join(articleDir, "index.html"), articleHtml, "utf-8");
    console.log(`Prerender OK: /blog/${post.slug}`);
  });
}

try {
  await prerenderBlog();
} catch (error) {
  console.error("Error al prerenderizar el blog:", error);
  process.exit(1);
}
