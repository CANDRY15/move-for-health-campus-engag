import { motion } from "framer-motion";

const Footer = () => (
  <footer className="bg-foreground py-8 px-5">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="container mx-auto max-w-5xl text-center"
    >
      <p className="font-display text-base font-bold text-background mb-1">Health Campus Move</p>
      <p className="text-background/50 text-xs italic mb-3">« Un pas, une santé, un avenir »</p>
      <p className="text-background/30 text-[10px]">
        © {new Date().getFullYear()} Health Campus Move — Fac/MED UNILU. Tous droits réservés.
      </p>
    </motion.div>
  </footer>
);

export default Footer;
