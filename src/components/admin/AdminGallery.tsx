import { useState, useEffect } from "react";
import { ImagePlus, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GalleryPhoto {
  id: string;
  url: string;
  storage_path: string;
  caption: string;
  created_at: string;
}

const AdminGallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const fetchPhotos = async () => {
    const { data } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", { ascending: false });
    setPhotos(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Fichier non valide (images uniquement)");
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(path, file);

    if (uploadError) {
      toast.error("Erreur lors du téléchargement");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);

    const { error: insertError } = await supabase.from("gallery_photos").insert({
      url: urlData.publicUrl,
      storage_path: path,
      caption: caption.trim() || "Photo",
    });

    if (insertError) {
      toast.error("Erreur lors de l'enregistrement");
    } else {
      toast.success("Photo ajoutée à la galerie");
      setCaption("");
      fetchPhotos();
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (photo: GalleryPhoto) => {
    if (!confirm("Supprimer cette photo ?")) return;

    await supabase.storage.from("gallery").remove([photo.storage_path]);
    const { error } = await supabase.from("gallery_photos").delete().eq("id", photo.id);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Photo supprimée");
      fetchPhotos();
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <ImagePlus className="w-5 h-5 text-primary" /> Ajouter une photo
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Légende (optionnel)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            maxLength={100}
          />
          <label className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-center cursor-pointer transition-colors ${
            uploading ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}>
            {uploading ? (
              <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</span>
            ) : (
              "Choisir une image"
            )}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Photos de la galerie ({photos.length})
        </h2>
        {loading ? (
          <p className="text-muted-foreground text-sm">Chargement...</p>
        ) : photos.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune photo. Les photos par défaut du site seront utilisées.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((p) => (
              <div key={p.id} className="relative group rounded-xl overflow-hidden aspect-[4/3]">
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(p)}
                    className="p-2 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {p.caption && (
                  <span className="absolute bottom-1 left-2 text-[10px] text-background font-medium">{p.caption}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
