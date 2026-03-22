import { motion } from "framer-motion";
import { Footprints, Megaphone, Stethoscope, BookOpenCheck, QrCode, ArrowRightCircle } from "lucide-react";
import posterImg from "@/assets/marche-sante-poster.jpg";

const activities = [
  { icon: Footprints, title: "Marches de santé", desc: "Événements communautaires de sensibilisation et de mobilisation autour de la prévention." },
  { icon: Megaphone, title: "Campagnes de sensibilisation", desc: "Actions ciblées pour informer la population sur les enjeux de santé publique." },
  { icon: Stethoscope, title: "Dépistages communautaires", desc: "Dépistages encadrés par des professionnels pour une détection précoce." },
  { icon: BookOpenCheck, title: "Éducation sanitaire", desc: "Programmes éducatifs pour promouvoir les bonnes pratiques de santé." },
  { icon: QrCode, title: "Outils numériques", desc: "QR codes, formulaires et bases de données pour une collecte structurée." },
  { icon: ArrowRightCircle, title: "Orientation partenaires", desc: "Redirection vers les structures de soins et partenaires qualifiés." },
];

const ActivitiesSection = () => (
  <section id="activites" className="section-padding section-alt">
    <div className="container mx-auto max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nos activités</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      {/* First activity highlight */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-primary rounded-2xl overflow-hidden mb-14 lg:hidden">
        <img src={posterImg} alt="La Marche de Santé – 1ère édition" className="w-full" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 border hover:shadow-md transition-shadow group"
          >
            <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <a.icon size={22} className="text-accent-foreground group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground mb-2">{a.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ActivitiesSection;
