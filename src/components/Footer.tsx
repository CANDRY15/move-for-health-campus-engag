import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { ShieldCheck } from "lucide-react";

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
      <motion.div variants={fadeUp} className="mb-3">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 text-background/40 hover:text-background/70 text-[11px] transition-colors"
        >
          <ShieldCheck className="w-3 h-3" />
          Administration
        </Link>
      </motion.div>
      <motion.p variants={fadeUp} className="text-background/30 text-[10px]">
        © {new Date().getFullYear()} Health Campus Move — Fac/MED UNILU. Tous droits réservés.
      </motion.p>
    </motion.div>
  </footer>
);

export default Footer;
