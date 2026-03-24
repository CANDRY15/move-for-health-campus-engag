import { motion, useInView } from "framer-motion";
import { Users, Activity, TrendingUp, Handshake } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const useCountUp = (end: number, duration = 2000, startCounting: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, startCounting]);
  return count;
};

const indicators = [
  { icon: Users, label: "Participants", value: 150, suffix: "+", note: "Suivi par activité" },
  { icon: Activity, label: "Personnes dépistées", value: 85, suffix: "", note: "Dépistages encadrés" },
  { icon: TrendingUp, label: "Taux d'orientation", value: 92, suffix: "%", note: "Vers structures partenaires" },
  { icon: Handshake, label: "Partenariats", value: 12, suffix: "", note: "Académiques & sanitaires" },
];

const CounterCard = ({ ind, i }: { ind: typeof indicators[0]; i: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(ind.value, 2000, isInView);

  return (
    <motion.div
      ref={ref}
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
      <p className="font-display text-2xl font-bold text-primary mb-0.5">
        {count}{ind.suffix}
      </p>
      <p className="text-xs font-semibold text-foreground">{ind.label}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{ind.note}</p>
    </motion.div>
  );
};

const ImpactSection = () => (
  <section id="impact" className="section-padding overflow-hidden">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Impact et indicateurs</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-3 max-w-md mx-auto text-xs">
          Nos indicateurs sont mis à jour après chaque activité pour refléter l'impact réel de nos actions.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {indicators.map((ind, i) => (
          <CounterCard key={ind.label} ind={ind} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
