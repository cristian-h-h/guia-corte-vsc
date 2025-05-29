import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
// import {
//  fetchPosts,
//  createPost,
//  updatePost,
//  deletePost,
//} from "@/api/sanityApi";

const emptyPost = {
  _id: "",
  title: "",
  excerpt: "",
  content: "",
  image: "",
  date: "",
  author: "",
  category: "",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  seoImgAlt: "",
};

const BlogAdmin = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(emptyPost);
  const [isEditing, setIsEditing] = useState(false);

  // MAPEO: Al traer los posts desde Sanity
//  useEffect(() => {
//    fetchPosts().then((data) => {
//      setPosts(
//        data.map((post: any) => ({
//          _id: post._id,
//          title: post.title,
//          excerpt: post.excerpt,
//          content: post.content,
//          image: post.mainImage?.asset?.url || "",
//          date: post.publishedAt || "",
//          author: post.author || "",
//          category: post.tags?.[0] || "",
//          seoTitle: post.metaTitle || "",
//          seoDescription: post.metaDescription || "",
//          seoKeywords: post.tags?.join(", ") || "",
//          seoImgAlt: post.seoImgAlt || "",
//        }))
//      );
//    });
//  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentPost({
      ...currentPost,
      [name]: value,
    });
  };

  const handleAddPost = () => {
    setIsEditing(false);
    setCurrentPost({
      ...emptyPost,
      date: new Date().toISOString().split("T")[0],
      category: "Tutoriales",
    });
    setDialogOpen(true);
  };

  const handleEditPost = (post: any) => {
    setIsEditing(true);
    setCurrentPost({
      ...post,
      image: post.image || "",
      seoTitle: post.seoTitle || "",
      seoDescription: post.seoDescription || "",
      seoKeywords: post.seoKeywords || "",
      seoImgAlt: post.seoImgAlt || "",
    });
    setDialogOpen(true);
  };

//  const handleDeletePost = async (id: string) => {
//    await deletePost(id);
//    // Refresca y mapea de nuevo
//    fetchPosts().then((data) => {
//      setPosts(
//        data.map((post: any) => ({
//          _id: post._id,
//          title: post.title,
//          excerpt: post.excerpt,
//          content: post.content,
//          image: post.mainImage?.asset?.url || "",
//          date: post.publishedAt || "",
//          author: post.author || "",
//          category: post.tags?.[0] || "",
//          seoTitle: post.metaTitle || "",
//          seoDescription: post.metaDescription || "",
//          seoKeywords: post.tags?.join(", ") || "",
//          seoImgAlt: post.seoImgAlt || "",
//        }))
//      );
//    });
//    toast({
//      title: "Artículo eliminado",
//      description: "El artículo ha sido eliminado correctamente.",
//    });
//  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // MAPEO: De tu admin a Sanity
//    const postData = {
//      title: currentPost.title,
//      excerpt: currentPost.excerpt,
//      content: currentPost.content,
//      mainImage: currentPost.image
//        ? { asset: { url: currentPost.image } }
//        : undefined,
//      publishedAt: currentPost.date,
//      author: currentPost.author,
//      tags: currentPost.seoKeywords
//        ? currentPost.seoKeywords.split(",").map((t: string) => t.trim())
//        : [],
//      metaTitle: currentPost.seoTitle,
//      metaDescription: currentPost.seoDescription,
//      seoImgAlt: currentPost.seoImgAlt,
//    };

    if (isEditing && currentPost._id) {
//      await updatePost(currentPost._id, postData);
      toast({
        title: "Artículo actualizado",
        description: "Los cambios han sido guardados correctamente.",
      });
    } else {
//      await createPost(postData);
      toast({
        title: "Artículo añadido",
        description: "El nuevo artículo ha sido añadido correctamente.",
      });
    }

    // Refresca y mapea de nuevo
//    fetchPosts().then((data) => {
//      setPosts(
//        data.map((post: any) => ({
//          _id: post._id,
//          title: post.title,
//          excerpt: post.excerpt,
//          content: post.content,
//          image: post.mainImage?.asset?.url || "",
//          date: post.publishedAt || "",
//          author: post.author || "",
//          category: post.tags?.[0] || "",
//          seoTitle: post.metaTitle || "",
//          seoDescription: post.metaDescription || "",
//          seoKeywords: post.tags?.join(", ") || "",
//          seoImgAlt: post.seoImgAlt || "",
//        }))
//      );
//    });
    setDialogOpen(false);
  };

  // SEO helpers
  const seoTitleLength = currentPost.seoTitle?.length || 0;
  const seoDescriptionLength = currentPost.seoDescription?.length || 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestión del Blog</h2>
        <Button onClick={handleAddPost} className="flex items-center gap-2">
          <Plus size={16} /> Añadir Artículo
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gris-50 rounded-lg">
          <p className="text-gris-500">No hay artículos disponibles</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gris-50">
              <tr>
                <th className="px-4 py-3 text-left">Imagen</th>
                <th className="px-4 py-3 text-left">Título</th>
                <th className="px-4 py-3 text-left">Autor</th>
                <th className="px-4 py-3 text-center">Categoría</th>
                <th className="px-4 py-3 text-center">Fecha</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="w-16 h-16 rounded bg-gris-100 overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.seoImgAlt || post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gris-400">
                          Sin imagen
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gris-500 truncate max-w-xs">
                      {post.excerpt}
                    </p>
                  </td>
                  <td className="px-4 py-3">{post.author}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-naranja-50 text-naranja-600 rounded-full px-3 py-1 text-sm">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">{post.date?.split("T")[0]}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Artículo" : "Añadir Artículo"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentPost.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gris-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                    Extracto
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={currentPost.excerpt}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full border border-gris-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Contenido (HTML)
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={currentPost.content}
                    onChange={handleInputChange}
                    rows={10}
                    className="w-full border border-gris-300 rounded-md px-3 py-2 font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-1">
                      URL de la Imagen
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={currentPost.image}
                      onChange={handleInputChange}
                      className="w-full border border-gris-300 rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Categoría
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={currentPost.category}
                      onChange={handleInputChange}
                      className="w-full border border-gris-300 rounded-md px-3 py-2"
                    >
                      <option value="Tutoriales">Tutoriales</option>
                      <option value="Proyectos DIY">Proyectos DIY</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Herramientas">Herramientas</option>
                      <option value="Consejos">Consejos</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-1">
                      Autor
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={currentPost.author}
                      onChange={handleInputChange}
                      className="w-full border border-gris-300 rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-1">
                      Fecha de publicación
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={currentPost.date}
                      onChange={handleInputChange}
                      className="w-full border border-gris-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle" className="block text-sm font-medium mb-1">
                    Título SEO
                  </Label>
                  <Input
                    id="seoTitle"
                    name="seoTitle"
                    value={currentPost.seoTitle}
                    onChange={handleInputChange}
                    placeholder="Título optimizado para motores de búsqueda"
                    className="w-full"
                  />
                  <p className="text-xs text-gris-500 mt-1">
                    Recomendado: 50-60 caracteres. <span className={seoTitleLength > 60 ? "text-red-500" : ""}>{seoTitleLength}</span>
                  </p>
                </div>

                <div>
                  <Label htmlFor="seoDescription" className="block text-sm font-medium mb-1">
                    Descripción SEO
                  </Label>
                  <Textarea
                    id="seoDescription"
                    name="seoDescription"
                    value={currentPost.seoDescription}
                    onChange={handleInputChange}
                    placeholder="Descripción breve y optimizada para motores de búsqueda"
                    rows={3}
                  />
                  <p className="text-xs text-gris-500 mt-1">
                    Recomendado: 150-160 caracteres. <span className={seoDescriptionLength > 160 ? "text-red-500" : ""}>{seoDescriptionLength}</span>
                  </p>
                </div>

                <div>
                  <Label htmlFor="seoKeywords" className="block text-sm font-medium mb-1">
                    Palabras Clave
                  </Label>
                  <Input
                    id="seoKeywords"
                    name="seoKeywords"
                    value={currentPost.seoKeywords}
                    onChange={handleInputChange}
                    placeholder="Ej: guía de corte, carpintería, herramientas"
                    className="w-full"
                  />
                  <p className="text-xs text-gris-500 mt-1">
                    Separe las palabras clave con comas
                  </p>
                </div>

                <div>
                  <Label htmlFor="seoImgAlt" className="block text-sm font-medium mb-1">
                    Texto Alternativo de Imagen
                  </Label>
                  <Input
                    id="seoImgAlt"
                    name="seoImgAlt"
                    value={currentPost.seoImgAlt}
                    onChange={handleInputChange}
                    placeholder="Descripción breve de la imagen del artículo"
                    className="w-full"
                  />
                  <p className="text-xs text-gris-500 mt-1">
                    Importante para accesibilidad y SEO de imágenes
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogAdmin;
