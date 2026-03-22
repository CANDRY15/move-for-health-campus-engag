import { motion } from "framer-motion";
import { GraduationCap, Microscope, Building2 } from "lucide-react";

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
  <section id="apropos" className="section-padding section-alt">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">À propos</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-5">
              <item.icon className="text-accent-foreground" size={24} />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
