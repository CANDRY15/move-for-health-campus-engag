import { motion } from "framer-motion";
import { Users, Activity, TrendingUp, Handshake } from "lucide-react";

const indicators = [
  { icon: Users, label: "Participants", value: "—", note: "Suivi par activité" },
  { icon: Activity, label: "Personnes dépistées", value: "—", note: "Dépistages encadrés" },
  { icon: TrendingUp, label: "Taux d'orientation", value: "—", note: "Vers structures partenaires" },
  { icon: Handshake, label: "Partenariats", value: "—", note: "Académiques & sanitaires" },
];

const ImpactSection = () => (
  <section id="impact" className="section-padding overflow-hidden">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Impact et indicateurs</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-3 max-w-md mx-auto text-xs">
          Nos indicateurs seront mis à jour après chaque activité pour refléter l'impact réel de nos actions.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {indicators.map((ind, i) => (
          <motion.div
            key={ind.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="bg-card rounded-xl p-5 border text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
              <ind.icon className="text-accent-foreground" size={18} />
            </div>
            <p className="font-display text-xl font-bold text-foreground mb-0.5">{ind.value}</p>
            <p className="text-xs font-semibold text-foreground">{ind.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{ind.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
