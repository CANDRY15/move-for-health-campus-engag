const Footer = () => (
  <footer className="bg-foreground py-10 px-4">
    <div className="container mx-auto max-w-5xl text-center">
      <p className="font-display text-lg font-bold text-background mb-1">Health Campus Move</p>
      <p className="text-background/60 text-sm italic mb-4">« Un pas, une santé, un avenir »</p>
      <p className="text-background/40 text-xs">
        © {new Date().getFullYear()} Health Campus Move — Fac/MED UNILU. Tous droits réservés.
      </p>
    </div>
  </footer>
);

export default Footer;
