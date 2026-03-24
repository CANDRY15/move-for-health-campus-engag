import { motion } from "framer-motion";
import { Footprints, Megaphone, Stethoscope, BookOpenCheck, QrCode, ArrowRightCircle } from "lucide-react";
import { staggerContainer, fadeUp, scaleUp, titleReveal } from "@/lib/motion";
import posterImg from "@/assets/marche-sante-poster.jpg";
import marcheImg from "@/assets/marche-sante-event.jpg";
import educImg from "@/assets/education-sanitaire.jpg";

const activities = [
  { icon: Footprints, title: "Marches de santé", desc: "Événements communautaires de sensibilisation et de mobilisation autour de la prévention.", img: marcheImg },
  { icon: Megaphone, title: "Campagnes de sensibilisation", desc: "Actions ciblées pour informer la population sur les enjeux de santé publique." },
  { icon: Stethoscope, title: "Dépistages communautaires", desc: "Dépistages encadrés par des professionnels pour une détection précoce." },
  { icon: BookOpenCheck, title: "Éducation sanitaire", desc: "Programmes éducatifs pour promouvoir les bonnes pratiques de santé.", img: educImg },
  { icon: QrCode, title: "Outils numériques", desc: "QR codes, formulaires et bases de données pour une collecte structurée." },
  { icon: ArrowRightCircle, title: "Orientation partenaires", desc: "Redirection vers les structures de soins et partenaires qualifiés." },
];

const ActivitiesSection = () => (
  <section id="activites" className="section-padding section-alt overflow-hidden">
    <div className="container mx-auto max-w-6xl">
      <motion.div variants={titleReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Nos activités</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <motion.div variants={scaleUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl overflow-hidden mb-8 shadow-lg lg:hidden">
        <img src={posterImg} alt="La Marche de Santé – 1ère édition" className="w-full" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {activities.map((a) => (
          <motion.div
            key={a.title}
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: "0 16px 40px -12px hsl(var(--primary) / 0.12)" }}
            className="bg-card rounded-xl border transition-all duration-300 group overflow-hidden"
          >
            {a.img && (
              <div className="h-36 overflow-hidden">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            )}
            <div className="p-5">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <a.icon size={20} className="text-accent-foreground group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-sm font-bold text-foreground mb-1.5">{a.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{a.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ActivitiesSection;
