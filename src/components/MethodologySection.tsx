import { motion } from "framer-motion";
import { Shield, Database, FileText, BarChart3, FileOutput, Bot } from "lucide-react";
import analyseImg from "@/assets/analyse-donnees.jpg";

const steps = [
  { icon: Shield, title: "Prévention primaire mesurable", desc: "Actions de prévention conçues avec des indicateurs mesurables dès la conception." },
  { icon: Database, title: "Collecte de données encadrée", desc: "Protocoles rigoureux de collecte respectant les normes éthiques et scientifiques." },
  { icon: FileText, title: "Structuration documentaire", desc: "Organisation systématique des données collectées pour assurer leur exploitabilité." },
  { icon: BarChart3, title: "Analyse statistique", desc: "Traitement statistique des données pour en extraire des tendances et conclusions fiables." },
  { icon: FileOutput, title: "Production de rapports", desc: "Rapports scientifiques partagés avec les autorités sanitaires et partenaires." },
];

const MethodologySection = () => (
  <section id="methodologie" className="section-padding section-alt overflow-hidden">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Méthodologie</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl overflow-hidden mb-8 shadow-lg"
      >
        <img src={analyseImg} alt="Analyse de données" className="w-full h-44 md:h-56 object-cover" />
      </motion.div>

      <div className="space-y-4 mb-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-4 bg-card rounded-xl p-5 border hover:shadow-sm transition-shadow"
          >
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
              {i + 1}
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-foreground mb-0.5">{s.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-accent/60 rounded-xl p-5 border flex items-start gap-3"
      >
        <Bot className="text-primary shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-display font-bold text-foreground text-sm mb-1">Intelligence artificielle</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">
            L'intelligence artificielle est utilisée uniquement pour l'analyse et l'organisation des données. Aucune décision clinique automatisée n'est réalisée.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default MethodologySection;
