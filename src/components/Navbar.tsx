import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Stratégie", href: "#strategie" },
  { label: "Activités", href: "#activites" },
  { label: "Galerie", href: "#galerie" },
  { label: "Organisation", href: "#organisation" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "Impact", href: "#impact" },
  { label: "Valeurs", href: "#valeurs" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b" : "bg-transparent"}`}>
      <div className="flex items-center justify-between h-14 px-4">
        <motion.a
          href="#accueil"
          className={`font-display text-xl font-bold transition-colors ${scrolled ? "text-primary" : "text-primary-foreground"}`}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        >
          HCM
        </motion.a>
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={`text-xs font-medium transition-colors ${scrolled ? "text-muted-foreground hover:text-primary" : "text-primary-foreground/80 hover:text-primary-foreground"}`}>
              {l.label}
            </a>
          ))}
        </div>
        <button className={`lg:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-b overflow-hidden"
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="block px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
