import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit, Plus, Eye } from "lucide-react";
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

// Datos iniciales de artículos (simulados)
const initialPosts = [
  {
    id: 1,
    title: "Guía completa: Cómo hacer cortes perfectos con guía de aluminio",
    excerpt: "Aprende técnicas profesionales para utilizar tu guía de corte de aluminio y lograr resultados precisos en todos tus proyectos de carpintería y bricolaje.",
    content: "<p>Contenido completo del artículo...</p>",
    image: "/guia-imagenes/guia-corte-ajustable-terciamel.png",
    date: "2024-05-01",
    author: "Roberto Gómez",
    category: "Tutoriales",
    // SEO fields
    seoTitle: "Guía para Cortes Perfectos con Guía de Aluminio | Técnicas Profesionales",
    seoDescription: "Aprende técnicas profesionales para utilizar tu guía de corte y lograr resultados precisos en carpintería y bricolaje.",
    seoKeywords: "guía de corte, aluminio, cortes perfectos, carpintería, técnicas profesionales",
    seoImgAlt: "Demostración de corte perfecto con guía de aluminio",
  },
  {
    id: 2,
    title: "5 proyectos DIY imprescindibles utilizando tu guía de corte de aluminio",
    excerpt: "Descubre proyectos prácticos y creativos para poner a prueba tu guía de corte aluminio y mejorar tus habilidades de carpintería casera.",
    content: "<p>Contenido completo del artículo...</p>",
    image: "/guia-imagenes/guia-corte-sierra-circular-terciamel.png",
    date: "2024-04-25",
    author: "Ana Martínez",
    category: "Proyectos DIY"
  },
  {
    id: 3,
    title: "Mantenimiento profesional para tu guía de corte de aluminio",
    excerpt: "Guía completa con consejos expertos para mantener tu guía de corte en óptimas condiciones, prolongar su vida útil y garantizar cortes precisos.",
    content: "<p>Contenido completo del artículo...</p>",
    image: "/guia-imagenes/guia-corte-ajuste-rapido-terciamel.png",
    date: "2024-04-10",
    author: "Carlos Pérez",
    category: "Mantenimiento"
  },
  {
    id: 4,
    title: "Sierra circular vs. Caladora: ¿Qué herramienta es mejor con guía de aluminio?",
    excerpt: "Análisis detallado sobre qué herramienta ofrece mejores resultados para diferentes tipos de cortes utilizando la guía de aluminio de ajuste rápido.",
    content: "<p>Contenido completo del artículo...</p>",
    image: "/guia-imagenes/guia-corte-terciamel.png",
    date: "2024-03-20",
    author: "Miguel Santos",
    category: "Herramientas"
  },
  {
    id: 5,
    title: "Ventajas de usar guía de aluminio con router: Resultados profesionales",
    excerpt: "Descubre cómo la guía de corte aluminio transforma tu router en una herramienta de precisión profesional para trabajos avanzados de carpintería.",
    content: "<p>Contenido completo del artículo...</p>",
    image: "/guia-imagenes/guia-corte-recto-terciamel.png",
    date: "2024-03-05",
    author: "Laura Sánchez",
    category: "Herramientas"
  },
  {
    id: 6,
    title: "Optimización de espacio en talleres pequeños: Guía de corte multifuncional",
    excerpt: "Cómo la guía de corte aluminio ajuste rápido puede transformar cualquier espacio reducido en un taller funcional y profesional para carpintería.",
    content: "<p>Contenido completo del artículo...</p>",
    image: "/guia-imagenes/guia-corte-router-terciamel.png",
    date: "2024-02-15",
    author: "Javier Méndez",
    category: "Consejos"
  },
  {
    id: 7,
    title: "Cómo construir muebles perfectos usando la guía de corte como prensa",
    excerpt: "Tutorial paso a paso para aprovechar la guía de corte aluminio como sistema de prensado profesional en el armado y ensamblaje de muebles.",
    content: "<p>Contenido completo del artículo...</p>",
    image: "/guia-imagenes/guia-corte-ajuste-rapido-terciamel.png",
    date: "2024-01-30",
    author: "Martín Torres",
    category: "Tutoriales"
  }
];

const BlogAdmin = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState(initialPosts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>({
    id: 0,
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: "",
    author: "",
    category: "",
    // SEO fields
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    seoImgAlt: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentPost({
      ...currentPost,
      [name]: value
    });
  };

  const handleAddPost = () => {
    setIsEditing(false);
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    
    setCurrentPost({
      id: Date.now(),
      title: "",
      excerpt: "",
      content: "",
      image: "",
      date: today,
      author: "",
      category: "Tutoriales",
      // SEO fields
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      seoImgAlt: "",
    });
    setDialogOpen(true);
  };

  const handleEditPost = (post: any) => {
    setIsEditing(true);
    setCurrentPost({
      ...post,
      // Ensure SEO fields exist
      seoTitle: post.seoTitle || "",
      seoDescription: post.seoDescription || "",
      seoKeywords: post.seoKeywords || "",
      seoImgAlt: post.seoImgAlt || "",
    });
    setDialogOpen(true);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Artículo eliminado",
      description: "El artículo ha sido eliminado correctamente.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setPosts(posts.map(post => 
        post.id === currentPost.id ? currentPost : post
      ));
      toast({
        title: "Artículo actualizado",
        description: "Los cambios han sido guardados correctamente.",
      });
    } else {
      setPosts([...posts, currentPost]);
      toast({
        title: "Artículo añadido",
        description: "El nuevo artículo ha sido añadido correctamente.",
      });
    }
    
    setDialogOpen(false);
  };

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
                <tr key={post.id} className="border-t">
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
                  <td className="px-4 py-3 text-center">{post.date}</td>
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
                        onClick={() => handleDeletePost(post.id)}
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
                    Recomendado: 50-60 caracteres
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
                    Recomendado: 150-160 caracteres
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
