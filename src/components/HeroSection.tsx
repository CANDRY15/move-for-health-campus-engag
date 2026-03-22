import { motion } from "framer-motion";
import { Heart, BarChart3, Users } from "lucide-react";
import posterImg from "@/assets/marche-sante-poster.jpg";

const pillars = [
  { icon: Heart, label: "Prévention" },
  { icon: BarChart3, label: "Données" },
  { icon: Users, label: "Mobilisation" },
];

const HeroSection = () => (
  <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden pt-16">
    {/* Background gradient */}
    <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(0_0%_100%_/_0.1),_transparent_70%)]" />

    <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center section-padding">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary-foreground/70 font-body text-sm uppercase tracking-[0.3em] mb-4">
          Initiative nationale de santé publique
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
          Health Campus Move
        </h1>
        <p className="font-display text-xl md:text-2xl text-primary-foreground/90 italic mb-6">
          « Un pas, une santé, un avenir »
        </p>
        <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mb-10">
          Initiative scientifique nationale portée par la jeunesse universitaire congolaise visant à faire de la prévention le premier acte médical et de la donnée fiable le socle de la décision sanitaire.
        </p>

        <div className="flex flex-wrap gap-4">
          {pillars.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg px-5 py-3">
              <Icon className="text-primary-foreground" size={20} />
              <span className="text-primary-foreground font-semibold text-sm">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:block"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary-foreground/20">
          <img src={posterImg} alt="La Marche de Santé – 1ère édition, 17 Mai 2026" className="w-full h-auto" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
            <p className="text-primary-foreground text-sm font-semibold">Notre première activité</p>
            <p className="text-primary-foreground/80 text-xs">La Marche de Santé – 17 Mai 2026</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
