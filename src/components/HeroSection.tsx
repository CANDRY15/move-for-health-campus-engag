import { motion } from "framer-motion";
import { Heart, BarChart3, Users, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const pillars = [
  { icon: Heart, label: "Prévention" },
  { icon: BarChart3, label: "Données" },
  { icon: Users, label: "Mobilisation" },
];

const HeroSection = () => (
  <section id="accueil" className="relative min-h-[100svh] flex items-center overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground/90" />
    </div>

    <div className="container mx-auto relative z-10 px-5 pt-24 pb-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl mx-auto text-center lg:text-left lg:mx-0"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-primary-foreground/60 font-body text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-3"
        >
          Initiative nationale de santé publique
        </motion.p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05] mb-4">
          Health Campus
          <span className="block text-primary">Move</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display text-base sm:text-lg md:text-xl text-primary-foreground/85 italic mb-5"
        >
          « Un pas, une santé, un avenir »
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-primary-foreground/70 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
        >
          Initiative scientifique portée par la jeunesse universitaire congolaise pour faire de la prévention le premier acte médical et de la donnée fiable le socle de la décision sanitaire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center lg:justify-start gap-3"
        >
          {pillars.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-full px-4 py-2.5">
              <Icon className="text-primary" size={16} />
              <span className="text-primary-foreground font-medium text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
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
