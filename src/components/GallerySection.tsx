import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { staggerContainer, scaleUp, titleReveal } from "@/lib/motion";
import { supabase } from "@/integrations/supabase/client";

// Static fallback images
import gallery1 from "@/assets/gallery-event-1.jpg";
import gallery2 from "@/assets/gallery-event-2.jpg";
import gallery3 from "@/assets/gallery-event-3.jpg";
import gallery4 from "@/assets/gallery-event-4.jpg";
import gallery5 from "@/assets/gallery-event-5.jpg";
import gallery6 from "@/assets/gallery-event-6.jpg";

const fallbackPhotos = [
  { src: gallery1, alt: "Campagne de sensibilisation communautaire", caption: "Sensibilisation" },
  { src: gallery2, alt: "Marche de santé dans les rues", caption: "Marche de santé" },
  { src: gallery3, alt: "Dépistage gratuit en communauté", caption: "Dépistage" },
  { src: gallery4, alt: "Séminaire d'éducation sanitaire", caption: "Formation" },
  { src: gallery5, alt: "Photo d'équipe des volontaires HCM", caption: "Notre équipe" },
  { src: gallery6, alt: "Distribution de brochures de santé", caption: "Sensibilisation" },
];

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>(fallbackPhotos);

  useEffect(() => {
    const loadFromDB = async () => {
      const { data } = await supabase
        .from("gallery_photos")
        .select("url, caption")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setPhotos(
          data.map((p) => ({
            src: p.url,
            alt: p.caption || "Photo galerie",
            caption: p.caption || "",
          }))
        );
      }
    };
    loadFromDB();
  }, []);

  return (
    <section id="galerie" className="section-padding overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          variants={titleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Galerie photos</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-3" />
          <p className="text-muted-foreground text-xs max-w-md mx-auto">
            Retrouvez les moments forts de nos activités et événements à travers ces images.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {photos.map((photo, i) => (
            <motion.button
              key={i}
              variants={scaleUp}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(i)}
              className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-2 left-3 text-primary-foreground text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.caption}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.button
              className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground"
              onClick={() => setSelected(null)}
              whileTap={{ scale: 0.9 }}
            >
              <X size={28} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.7, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 2 }}
              transition={{ type: "spring", damping: 20 }}
              src={photos[selected].src}
              alt={photos[selected].alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
