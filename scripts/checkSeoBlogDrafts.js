import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { blogDraftPosts } from "./blogDraftPosts.js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseReadKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseReadKey) {
  console.error("Error: faltan credenciales de Supabase.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseReadKey);
const slugs = blogDraftPosts.map((post) => post.slug);

const { data, error } = await supabase
  .from("blog_posts")
  .select("slug,title,published_at")
  .in("slug", slugs)
  .order("published_at", { ascending: false });

if (error) {
  console.error("Error al verificar borradores SEO:", error);
  process.exit(1);
}

console.log(`Encontrados: ${data.length}/${slugs.length}`);
for (const post of data) {
  console.log(`- ${post.slug} | ${post.title}`);
}
