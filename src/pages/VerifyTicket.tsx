import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowLeft, Ticket, User, Tag, Loader2 } from "lucide-react";
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

  useEffect(() => {
    const loadTicket = async () => {
      let ticketId: string | null = null;

      const data = searchParams.get("data");
      if (data) {
        try {
          const parsed = JSON.parse(decodeURIComponent(data));
          ticketId = parsed.ticket_id || parsed.id;
        } catch { /* fall through */ }
      }

      if (!ticketId) {
        ticketId = searchParams.get("ticket_id") || searchParams.get("id");
      }

      if (!ticketId) {
        setError(true);
        setLoading(false);
        return;
      }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Retour au site
        </Link>

        {error ? (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg text-center">
            <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-7 h-7 text-destructive" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Billet invalide</h1>
            <p className="text-sm text-muted-foreground mt-2">Ce QR code ne correspond à aucun billet enregistré.</p>
          </div>
        ) : ticket ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
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
        ) : null}
      </motion.div>
    </div>
  );
};

export default VerifyTicket;