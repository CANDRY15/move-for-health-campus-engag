import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { staggerContainer, fadeUp, titleReveal } from "@/lib/motion";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Grâce MWAMBA",
    role: "Étudiante en médecine, UNILU",
    text: "Grâce à HCM, j'ai compris l'importance de la prévention. Les marches de santé m'ont permis de sensibiliser ma propre communauté.",
    rating: 5,
  },
  {
    name: "Patrick ILUNGA",
    role: "Participant, Campagne de dépistage",
    text: "J'ai été dépisté gratuitement lors d'une campagne HCM. C'est une initiative qui sauve des vies et qui mérite d'être soutenue.",
    rating: 5,
  },
  {
    name: "Esther KALONDA",
    role: "Volontaire HCM",
    text: "Rejoindre HCM a transformé ma vision de la santé publique. L'esprit d'équipe et l'engagement des membres sont remarquables.",
    rating: 5,
  },
  {
    name: "Jean-Paul KASONGO",
    role: "Enseignant, Faculté de Médecine",
    text: "HCM représente exactement ce dont notre système de santé a besoin : des jeunes engagés, des données fiables et une approche terrain.",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section id="temoignages" className="section-padding bg-muted/50 overflow-hidden">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        variants={titleReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Témoignages</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-3" />
        <p className="text-muted-foreground text-xs max-w-md mx-auto">
          Découvrez ce que nos participants et volontaires disent de leur expérience avec HCM.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -10px hsl(var(--primary) / 0.12)" }}
            className="bg-card rounded-xl p-5 border shadow-sm relative transition-all duration-300"
          >
            <Quote className="text-primary/15 absolute top-4 right-4" size={32} />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + j * 0.08, type: "spring", damping: 10 }}
                >
                  <Star size={12} className="fill-primary text-primary" />
                </motion.div>
              ))}
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed mb-4 italic">
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                {t.name.split(" ").map(p => p[0]).slice(0, 2).join("")}
              </div>
              <div>
                <p className="font-semibold text-foreground text-xs">{t.name}</p>
                <p className="text-muted-foreground text-[11px]">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TestimonialsSection;
