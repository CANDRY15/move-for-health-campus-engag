import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowLeft, Ticket, User, Tag } from "lucide-react";

interface TicketInfo {
  id: string;
  name: string;
  category: "standard" | "vip";
  verified: boolean;
}

const VerifyTicket = () => {
  const [searchParams] = useSearchParams();
  const [ticket, setTicket] = useState<TicketInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Try parsing from "data" query param (QR encodes JSON in the URL)
    const data = searchParams.get("data");
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        if (parsed.id && parsed.name) {
          setTicket(parsed);
          return;
        }
      } catch { /* fall through */ }
    }

    // Try parsing the entire URL hash or raw params
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const category = searchParams.get("category");
    if (id && name) {
      setTicket({
        id,
        name,
        category: category === "vip" ? "vip" : "standard",
        verified: true,
      });
      return;
    }

    setError(true);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Retour au site
        </Link>

        {error ? (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg text-center">
            <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-7 h-7 text-destructive" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Billet invalide</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Ce QR code ne contient pas de données de billet valides.
            </p>
          </div>
        ) : ticket ? (
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className={`p-5 text-center ${ticket.category === "vip" ? "bg-gradient-to-r from-yellow-500 to-amber-500" : "bg-gradient-to-r from-primary to-primary/80"}`}>
              <CheckCircle2 className="w-10 h-10 text-white mx-auto mb-2" />
              <h2 className="text-lg font-bold text-white">Billet Vérifié ✓</h2>
              <p className="text-white/80 text-xs">Ce billet est authentique</p>
            </div>

            <div className="p-5 space-y-4">
              <div className="border-t-2 border-dashed border-border" />

              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Health Campus Move</p>
                <p className="text-lg font-bold text-foreground mt-1">Marche de santé 2026</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                  ticket.category === "vip"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-primary/10 text-primary"
                }`}>
                  {ticket.category === "vip" ? "VIP — $25" : "STANDARD — $20"}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                  <User className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Nom</p>
                    <p className="font-medium text-foreground">{ticket.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                  <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Catégorie</p>
                    <p className="font-medium text-foreground capitalize">{ticket.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                  <Ticket className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">ID Billet</p>
                    <p className="font-mono text-xs text-foreground">{ticket.id}</p>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-border" />

              <div className={`text-center p-3 rounded-xl ${ticket.verified ? "bg-green-50 dark:bg-green-900/20" : "bg-destructive/10"}`}>
                <p className={`text-sm font-bold ${ticket.verified ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>
                  {ticket.verified ? "✓ PAYÉ & VÉRIFIÉ" : "✗ NON VÉRIFIÉ"}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

export default VerifyTicket;
