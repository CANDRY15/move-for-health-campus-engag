import { motion } from "framer-motion";
import { Target, CheckCircle, TrendingUp, BookOpen } from "lucide-react";
import { staggerContainer, fadeUp, fadeLeft, fadeRight, titleReveal } from "@/lib/motion";

const objectives = [
  "Promouvoir la prévention comme premier acte médical auprès de la communauté universitaire et péri-universitaire",
  "Produire des données sanitaires fiables et exploitables pour les décideurs",
  "Renforcer les capacités des jeunes en matière de santé publique et de recherche",
  "Créer un réseau de veille sanitaire universitaire à l'échelle nationale",
];

const results = [
  "Réduction mesurable des facteurs de risque dans les communautés ciblées",
  "Base de données sanitaire universitaire exploitable",
  "Réseau de jeunes formés en prévention et collecte de données",
  "Rapports scientifiques publiés et partagés avec les autorités",
];

const StrategySection = () => (
  <section id="strategie" className="section-padding overflow-hidden">
    <div className="container mx-auto max-w-5xl">
      <motion.div variants={titleReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Cadre stratégique</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-accent/50 rounded-xl p-6 mb-8 border">
        <div className="flex items-start gap-3">
          <Target className="text-primary mt-0.5 shrink-0" size={22} />
          <div>
            <h3 className="font-display text-base font-bold text-foreground mb-1.5">Objectif global</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Faire de la prévention un réflexe communautaire et de la donnée sanitaire un outil de décision accessible, en mobilisant la jeunesse universitaire congolaise comme actrice de changement.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-xl p-6 border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-primary" size={18} />
            <h3 className="font-display text-sm font-bold text-foreground">Objectifs spécifiques</h3>
          </div>
          <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
            {objectives.map((o, i) => (
              <motion.li key={i} variants={fadeUp} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</span>
                {o}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-xl p-6 border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-primary" size={18} />
            <h3 className="font-display text-sm font-bold text-foreground">Résultats attendus</h3>
          </div>
          <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
            {results.map((r, i) => (
              <motion.li key={i} variants={fadeUp} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</span>
                {r}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-xl p-6 border shadow-sm">
        <div className="flex items-start gap-3">
          <BookOpen className="text-primary mt-0.5 shrink-0" size={20} />
          <div>
            <h3 className="font-display text-sm font-bold text-foreground mb-1.5">Justification scientifique</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              La prévention primaire constitue l'approche la plus rentable en santé publique. En République Démocratique du Congo, le déficit de données fiables et la faible implication des jeunes dans la prévention constituent des freins majeurs à l'amélioration des indicateurs sanitaires. Health Campus Move s'inscrit dans une démarche fondée sur les preuves, en produisant des données de terrain et en formant une nouvelle génération d'acteurs de prévention.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default StrategySection;
