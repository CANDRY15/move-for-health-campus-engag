import { motion } from "framer-motion";
import { Target, CheckCircle, TrendingUp, BookOpen } from "lucide-react";

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
  <section id="strategie" className="section-padding">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cadre stratégique</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent/50 rounded-xl p-8 mb-10 border">
        <div className="flex items-start gap-4">
          <Target className="text-primary mt-1 shrink-0" size={28} />
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Objectif global</h3>
            <p className="text-muted-foreground leading-relaxed">
              Faire de la prévention un réflexe communautaire et de la donnée sanitaire un outil de décision accessible, en mobilisant la jeunesse universitaire congolaise comme actrice de changement.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-xl p-8 border shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle className="text-primary" size={22} />
            <h3 className="font-display text-lg font-bold text-foreground">Objectifs spécifiques</h3>
          </div>
          <ul className="space-y-3">
            {objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">{i + 1}</span>
                {o}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-xl p-8 border shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="text-primary" size={22} />
            <h3 className="font-display text-lg font-bold text-foreground">Résultats attendus</h3>
          </div>
          <ul className="space-y-3">
            {results.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">{i + 1}</span>
                {r}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-xl p-8 border shadow-sm">
        <div className="flex items-start gap-4">
          <BookOpen className="text-primary mt-1 shrink-0" size={24} />
          <div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Justification scientifique</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              La prévention primaire constitue l'approche la plus rentable en santé publique. En République Démocratique du Congo, le déficit de données fiables et la faible implication des jeunes dans la prévention constituent des freins majeurs à l'amélioration des indicateurs sanitaires. Health Campus Move s'inscrit dans une démarche fondée sur les preuves, en produisant des données de terrain et en formant une nouvelle génération d'acteurs de prévention.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default StrategySection;
