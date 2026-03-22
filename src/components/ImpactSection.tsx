import { motion } from "framer-motion";
import { Users, Activity, TrendingUp, Handshake } from "lucide-react";

const indicators = [
  { icon: Users, label: "Nombre de participants", value: "—", note: "Suivi par activité" },
  { icon: Activity, label: "Personnes dépistées", value: "—", note: "Dépistages encadrés" },
  { icon: TrendingUp, label: "Taux d'orientation", value: "—", note: "Vers structures partenaires" },
  { icon: Handshake, label: "Partenariats", value: "—", note: "Académiques & sanitaires" },
];

const ImpactSection = () => (
  <section id="impact" className="section-padding">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Impact et indicateurs</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm">
          Nos indicateurs seront mis à jour après chaque activité pour refléter l'impact réel de nos actions.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {indicators.map((ind, i) => (
          <motion.div
            key={ind.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 border text-center hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <ind.icon className="text-accent-foreground" size={22} />
            </div>
            <p className="font-display text-2xl font-bold text-foreground mb-1">{ind.value}</p>
            <p className="text-sm font-semibold text-foreground">{ind.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{ind.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
