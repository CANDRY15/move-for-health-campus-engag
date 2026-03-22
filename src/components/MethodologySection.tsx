import { motion } from "framer-motion";
import { Shield, Database, FileText, BarChart3, FileOutput, Bot } from "lucide-react";

const steps = [
  { icon: Shield, title: "Prévention primaire mesurable", desc: "Actions de prévention conçues avec des indicateurs mesurables dès la conception." },
  { icon: Database, title: "Collecte de données encadrée", desc: "Protocoles rigoureux de collecte respectant les normes éthiques et scientifiques." },
  { icon: FileText, title: "Structuration documentaire", desc: "Organisation systématique des données collectées pour assurer leur exploitabilité." },
  { icon: BarChart3, title: "Analyse statistique", desc: "Traitement statistique des données pour en extraire des tendances et conclusions fiables." },
  { icon: FileOutput, title: "Production de rapports", desc: "Rapports scientifiques partagés avec les autorités sanitaires et partenaires." },
];

const MethodologySection = () => (
  <section id="methodologie" className="section-padding section-alt">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Méthodologie</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="space-y-6 mb-10">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-5 bg-card rounded-xl p-6 border"
          >
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              {i + 1}
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-foreground mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent/50 rounded-xl p-6 border flex items-start gap-4">
        <Bot className="text-primary shrink-0 mt-1" size={24} />
        <div>
          <h4 className="font-display font-bold text-foreground text-sm mb-1">Intelligence artificielle</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            L'intelligence artificielle est utilisée uniquement pour l'analyse et l'organisation des données. Aucune décision clinique automatisée n'est réalisée.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default MethodologySection;
