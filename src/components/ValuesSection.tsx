import { motion } from "framer-motion";
import { Lock, FileCheck, Eye, Scale } from "lucide-react";

const values = [
  { icon: Lock, title: "Confidentialité", desc: "Protection rigoureuse des données personnelles et médicales collectées." },
  { icon: FileCheck, title: "Consentement éclairé", desc: "Participation volontaire et informée à toutes les activités de collecte." },
  { icon: Eye, title: "Transparence", desc: "Communication ouverte sur nos méthodes, résultats et financements." },
  { icon: Scale, title: "Neutralité politique", desc: "Indépendance totale vis-à-vis de toute affiliation politique." },
];

const ValuesSection = () => (
  <section id="valeurs" className="section-padding section-alt">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Valeurs et principes</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-5 bg-card rounded-xl p-6 border"
          >
            <div className="w-11 h-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <v.icon size={20} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-foreground mb-1">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValuesSection;
