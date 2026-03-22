import { motion } from "framer-motion";
import { GraduationCap, Microscope, Building2 } from "lucide-react";
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">À propos</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      {/* Photo banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl overflow-hidden mb-10 shadow-lg"
      >
        <img src={depistageImg} alt="Dépistage communautaire" className="w-full h-48 md:h-64 object-cover" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center mb-4">
              <item.icon className="text-accent-foreground" size={22} />
            </div>
            <h3 className="font-display text-base font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
