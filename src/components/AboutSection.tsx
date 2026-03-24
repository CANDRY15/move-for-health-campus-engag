import { motion } from "framer-motion";
import { GraduationCap, Microscope, Building2 } from "lucide-react";
import { staggerContainer, fadeUp, scaleUp, titleReveal } from "@/lib/motion";
import depistageImg from "@/assets/depistage-communautaire.jpg";

const items = [
  {
    icon: GraduationCap,
    title: "Portée par la jeunesse",
    desc: "Étudiants en sciences de la santé et jeunes professionnels engagés pour une santé publique proactive.",
  },
  {
    icon: Microscope,
    title: "Plateforme scientifique",
    desc: "Structure de prévention et catalyseur de production de données fiables pour appuyer les autorités sanitaires.",
  },
  {
    icon: Building2,
    title: "Complémentaire",
    desc: "Positionnement non clinique, complémentaire aux institutions sanitaires existantes.",
  },
];

const AboutSection = () => (
  <section id="apropos" className="section-padding section-alt overflow-hidden">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        variants={titleReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">À propos</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <motion.div
        variants={scaleUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-2xl overflow-hidden mb-10 shadow-lg"
      >
        <img src={depistageImg} alt="Dépistage communautaire" className="w-full h-48 md:h-64 object-cover" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-5"
      >
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: "0 12px 30px -10px hsl(var(--primary) / 0.15)" }}
            className="bg-card rounded-xl p-6 shadow-sm border transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center mb-4">
              <item.icon className="text-accent-foreground" size={22} />
            </div>
            <h3 className="font-display text-base font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
