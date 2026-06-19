import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { blogDraftPosts } from "./blogDraftPosts.js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseWriteKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseWriteKey) {
  console.error("Error: VITE_SUPABASE_URL y una clave de escritura de Supabase son requeridos.");
  process.exit(1);
}

const usingServiceRole = Boolean(
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

const supabase = createClient(supabaseUrl, supabaseWriteKey);

async function upsertDraftPosts() {
  console.log("Insertando borradores SEO del blog...");
  console.log(
    usingServiceRole
      ? "Usando service role key para escritura en blog_posts."
      : "Usando anon key. Si hay RLS activa para insercion, la carga fallara."
  );

  for (const post of blogDraftPosts) {
    const { data: existingPost, error: existingError } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", post.slug)
      .maybeSingle();

    if (existingError) {
      console.error(`Error al buscar el articulo "${post.title}":`, existingError);
      continue;
    }

    if (existingPost?.id) {
      const { error: updateError } = await supabase
        .from("blog_posts")
        .update(post)
        .eq("id", existingPost.id);

      if (updateError) {
        console.error(`Error al actualizar "${post.title}":`, updateError);
      } else {
        console.log(`Actualizado: ${post.title}`);
      }

      continue;
    }

    const { error: insertError } = await supabase
      .from("blog_posts")
      .insert([post]);

    if (insertError) {
      console.error(`Error al insertar "${post.title}":`, insertError);
    } else {
      console.log(`Insertado: ${post.title}`);
    }
  }

  console.log("Proceso completado.");
}

upsertDraftPosts().catch((error) => {
  console.error("Error durante la ejecucion:", error);
  process.exit(1);
});
