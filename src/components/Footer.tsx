import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

const Footer = () => (
  <footer className="bg-foreground py-8 px-5">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="container mx-auto max-w-5xl text-center"
    >
      <motion.p variants={fadeUp} className="font-display text-base font-bold text-background mb-1">Health Campus Move</motion.p>
      <motion.p variants={fadeUp} className="text-background/50 text-xs italic mb-3">« Un pas, une santé, un avenir »</motion.p>
      <motion.p variants={fadeUp} className="text-background/30 text-[10px]">
        © {new Date().getFullYear()} Health Campus Move — Fac/MED UNILU. Tous droits réservés.
      </motion.p>
    </motion.div>
  </footer>
);

export default Footer;
