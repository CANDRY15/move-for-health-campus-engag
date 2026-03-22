import { motion } from "framer-motion";
import { Lock, FileCheck, Eye, Scale } from "lucide-react";

const values = [
  { icon: Lock, title: "Confidentialité", desc: "Protection rigoureuse des données personnelles et médicales collectées." },
  { icon: FileCheck, title: "Consentement éclairé", desc: "Participation volontaire et informée à toutes les activités de collecte." },
  { icon: Eye, title: "Transparence", desc: "Communication ouverte sur nos méthodes, résultats et financements." },
  { icon: Scale, title: "Neutralité politique", desc: "Indépendance totale vis-à-vis de toute affiliation politique." },
];

const ValuesSection = () => (
  <section id="valeurs" className="section-padding section-alt overflow-hidden">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Valeurs et principes</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 bg-card rounded-xl p-5 border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <v.icon size={18} />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-foreground mb-1">{v.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValuesSection;
