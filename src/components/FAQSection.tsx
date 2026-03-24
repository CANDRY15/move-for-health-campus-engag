import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { staggerContainer, fadeUp, titleReveal } from "@/lib/motion";

const faqs = [
  {
    question: "Qu'est-ce que Health Campus Move (HCM) ?",
    answer:
      "HCM est une initiative scientifique nationale de santé publique portée par la jeunesse universitaire congolaise. Notre mission est de promouvoir la prévention, le dépistage et la sensibilisation à travers des activités terrain sur les campus.",
  },
  {
    question: "Qui peut participer aux activités de HCM ?",
    answer:
      "Toute personne intéressée peut participer : étudiants, enseignants, membres de la communauté locale. Nos activités sont ouvertes et gratuites. Les étudiants en sciences de la santé sont particulièrement encouragés à rejoindre l'équipe de volontaires.",
  },
  {
    question: "Comment devenir volontaire ou membre de HCM ?",
    answer:
      "Vous pouvez nous contacter via WhatsApp ou notre formulaire de contact. Nous organisons des sessions d'intégration régulières pour accueillir les nouveaux membres et les former à nos méthodologies de terrain.",
  },
  {
    question: "Les dépistages proposés sont-ils gratuits ?",
    answer:
      "Oui, tous les dépistages organisés lors de nos campagnes sont entièrement gratuits. Nous travaillons avec des partenaires académiques et sanitaires pour garantir la fiabilité des résultats.",
  },
  {
    question: "Dans quelles villes HCM est-il présent ?",
    answer:
      "HCM a démarré ses activités à Lubumbashi et vise une expansion progressive vers d'autres villes universitaires de la RDC. Notre objectif est de créer un réseau national de campus engagés pour la santé.",
  },
  {
    question: "Comment soutenir financièrement HCM ?",
    answer:
      "Vous pouvez soutenir HCM en devenant partenaire, en faisant un don, ou en sponsorisant une activité spécifique. Contactez-nous pour discuter des modalités de collaboration.",
  },
];

const FAQSection = () => (
  <section id="faq" className="section-padding bg-muted/50 overflow-hidden">
    <div className="container mx-auto max-w-2xl">
      <motion.div
        variants={titleReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
          Questions fréquentes
        </h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-3" />
        <p className="text-muted-foreground text-xs max-w-md mx-auto">
          Retrouvez les réponses aux questions les plus posées sur notre initiative.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp}>
              <AccordionItem
                value={`faq-${i}`}
                className="bg-card border rounded-xl px-4 data-[state=open]:shadow-sm transition-shadow"
              >
                <AccordionTrigger className="text-sm font-semibold text-foreground text-left py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
