import { motion } from "framer-motion";
import { Heart, BarChart3, Users, ChevronDown } from "lucide-react";
import posterImg from "@/assets/marche-sante-poster.jpg";

const pillars = [
  { icon: Heart, label: "Prévention" },
  { icon: BarChart3, label: "Données" },
  { icon: Users, label: "Mobilisation" },
];

const HeroSection = () => (
  <section id="accueil" className="relative min-h-[100svh] flex items-center overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(0_0%_100%_/_0.08),_transparent_70%)]" />

    <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center px-5 pt-20 pb-12 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-primary-foreground/60 font-body text-xs uppercase tracking-[0.25em] mb-3"
        >
          Initiative nationale de santé publique
        </motion.p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-3">
          Health Campus Move
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display text-lg md:text-xl text-primary-foreground/85 italic mb-5"
        >
          « Un pas, une santé, un avenir »
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-primary-foreground/75 text-sm md:text-base leading-relaxed max-w-lg mb-8"
        >
          Initiative scientifique nationale portée par la jeunesse universitaire congolaise visant à faire de la prévention le premier acte médical et de la donnée fiable le socle de la décision sanitaire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-3"
        >
          {pillars.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-full px-4 py-2.5">
              <Icon className="text-primary-foreground" size={16} />
              <span className="text-primary-foreground font-medium text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden lg:block"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary-foreground/15">
          <img src={posterImg} alt="La Marche de Santé – 1ère édition, 17 Mai 2026" className="w-full h-auto" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-5">
            <p className="text-primary-foreground text-sm font-semibold">Notre première activité</p>
            <p className="text-primary-foreground/70 text-xs">La Marche de Santé – 17 Mai 2026</p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
    >
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <ChevronDown className="text-primary-foreground/50" size={24} />
      </motion.div>
    </motion.div>
  </section>
);

export default HeroSection;
