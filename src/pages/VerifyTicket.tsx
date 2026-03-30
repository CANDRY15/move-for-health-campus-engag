import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowLeft, Ticket, User, Tag, ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TicketInfo {
  ticket_id: string;
  name: string;
  category: string;
  verified: boolean;
  seller_name?: string;
}

const VerifyTicket = () => {
  const [searchParams] = useSearchParams();
  const [ticket, setTicket] = useState<TicketInfo | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"password" | "result">("password");
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const loadTicket = async () => {
      let ticketId: string | null = null;

      // Try "data" param (QR encodes JSON)
      const data = searchParams.get("data");
      if (data) {
        try {
          const parsed = JSON.parse(decodeURIComponent(data));
          ticketId = parsed.ticket_id || parsed.id;
        } catch { /* fall through */ }
      }

      // Try direct params
      if (!ticketId) {
        ticketId = searchParams.get("ticket_id") || searchParams.get("id");
      }

      if (!ticketId) {
        setError(true);
        setLoading(false);
        return;
      }

      // Look up ticket in DB
      const { data: ticketData, error: dbError } = await supabase
        .from("tickets")
        .select("ticket_id, name, category, verified, seller_id")
        .eq("ticket_id", ticketId)
        .maybeSingle();

      if (dbError || !ticketData) {
        setError(true);
        setLoading(false);
        return;
      }

      // Get seller name
      let sellerName = "";
      if (ticketData.seller_id) {
        const { data: sellerData } = await supabase
          .from("sellers")
          .select("name")
          .eq("id", ticketData.seller_id)
          .maybeSingle();
        sellerName = sellerData?.name || "";
      }

      setTicket({
        ticket_id: ticketData.ticket_id,
        name: ticketData.name,
        category: ticketData.category,
        verified: ticketData.verified,
        seller_name: sellerName,
      });
      setLoading(false);
    };

    loadTicket();
  }, [searchParams]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);

    // Check password against sellers table (any active seller/admin can validate)
    const { data } = await supabase
      .from("sellers")
      .select("id")
      .eq("password", password)
      .eq("active", true)
      .maybeSingle();

    if (!data) {
      setPwError(true);
      setVerifying(false);
      return;
    }

    setStep("result");
    setVerifying(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

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
              Ce QR code ne correspond à aucun billet enregistré.
            </p>
          </div>
        ) : ticket ? (
          <AnimatePresence mode="wait">
            {step === "password" ? (
              <motion.div key="pw" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                {/* Show ticket preview */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-lg mb-4">
                  <div className="text-center mb-3">
                    <Ticket className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Vérification du billet</p>
                    <p className="text-lg font-bold text-foreground mt-1">{ticket.name}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                      ticket.category === "vip"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {ticket.category === "vip" ? "VIP" : "STANDARD"}
                    </span>
                  </div>
                </div>

                {/* Password form */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Authentification requise</p>
                    <p className="text-xs text-muted-foreground mt-1">Entrez votre mot de passe vendeur pour valider</p>
                  </div>
                  <form onSubmit={handleVerify} className="space-y-3">
                    <input
                      type="password"
                      placeholder="Mot de passe vendeur"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                      required
                    />
                    {pwError && <p className="text-destructive text-xs">Mot de passe incorrect</p>}
                    <button
                      type="submit"
                      disabled={verifying}
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
                    >
                      {verifying ? "Vérification..." : "Valider le billet"}
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
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
                          <p className="font-mono text-xs text-foreground">{ticket.ticket_id}</p>
                        </div>
                      </div>
                      {ticket.seller_name && (
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                          <User className="w-4 h-4 text-muted-foreground shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Vendu par</p>
                            <p className="font-medium text-foreground">{ticket.seller_name}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t-2 border-dashed border-border" />
                    <div className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                      <p className="text-sm font-bold text-green-600 dark:text-green-400">
                        ✓ PAYÉ & VÉRIFIÉ
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : null}
      </motion.div>
    </div>
  );
};

export default VerifyTicket;
