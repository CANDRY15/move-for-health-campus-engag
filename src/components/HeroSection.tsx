import { motion } from "framer-motion";
import { Heart, BarChart3, Users } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/motion";
import heroBg from "@/assets/hero-bg.jpg";

const pillars = [
  { icon: Heart, label: "Prévention" },
  { icon: BarChart3, label: "Données" },
  { icon: Users, label: "Mobilisation" },
];

const HeroSection = () => (
  <section id="accueil" className="relative min-h-[100svh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <motion.img
        src={heroBg}
        alt=""
        className="w-full h-full object-cover"
        width={1920}
        height={1080}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground/90" />
    </div>

    <div className="relative z-10 w-full px-5 pt-20 pb-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-xl mx-auto text-center lg:text-left lg:mx-0 lg:pl-8"
      >
        <motion.p
          variants={fadeUp}
          className="text-primary-foreground/60 font-body text-[10px] uppercase tracking-[0.25em] mb-3"
        >
          Initiative nationale de santé publique
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-[1.05] mb-4"
        >
          Health Campus
          <motion.span
            className="block text-primary"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", damping: 15 }}
          >
            Move
          </motion.span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-display text-base sm:text-lg text-primary-foreground/85 italic mb-4"
        >
          « Un pas, une santé, un avenir »
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-primary-foreground/70 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6"
        >
          Initiative scientifique portée par la jeunesse universitaire congolaise pour faire de la prévention le premier acte médical.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center lg:justify-start gap-2.5"
        >
          {pillars.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15, type: "spring", damping: 15 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-full px-3.5 py-2"
            >
              <Icon className="text-primary" size={14} />
              <span className="text-primary-foreground font-medium text-xs">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
