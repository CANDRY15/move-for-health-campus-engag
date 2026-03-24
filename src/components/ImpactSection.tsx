import { motion, useInView } from "framer-motion";
import { Users, Activity, TrendingUp, Handshake } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { staggerContainer, scaleUp, titleReveal } from "@/lib/motion";

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

const CounterCard = ({ ind }: { ind: typeof indicators[0] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(ind.value, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      variants={scaleUp}
      whileHover={{ y: -6, boxShadow: "0 12px 30px -10px hsl(var(--primary) / 0.2)" }}
      className="bg-card rounded-xl p-5 border text-center transition-all duration-300"
    >
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 12 }}
        className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mx-auto mb-3"
      >
        <ind.icon className="text-accent-foreground" size={18} />
      </motion.div>
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
      <motion.div variants={titleReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Impact et indicateurs</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-3 max-w-md mx-auto text-xs">
          Nos indicateurs sont mis à jour après chaque activité pour refléter l'impact réel de nos actions.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {indicators.map((ind) => (
          <CounterCard key={ind.label} ind={ind} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default ImpactSection;
