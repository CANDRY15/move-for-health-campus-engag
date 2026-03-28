import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Ticket, ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface TicketData {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: "standard" | "vip";
  date: string;
  verified: boolean;
}

const MyTicket = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("hcm_tickets") || "[]");
    setTickets(stored);
  }, []);

  const deleteTicket = (id: string) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    localStorage.setItem("hcm_tickets", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Retour au site
        </Link>

        <div className="text-center mb-6">
          <Ticket className="w-8 h-8 text-primary mx-auto mb-2" />
          <h1 className="text-xl font-bold text-foreground">Mes Billets</h1>
          <p className="text-xs text-muted-foreground">Billets enregistrés sur cet appareil</p>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">Aucun billet enregistré</p>
            <Link to="/ticket" className="inline-block mt-3 text-primary text-sm font-medium hover:underline">
              Enregistrer un billet
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-md"
              >
                <div className={`px-4 py-3 flex items-center justify-between ${
                  ticket.category === "vip"
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                    : "bg-gradient-to-r from-primary to-primary/80"
                }`}>
                  <div>
                    <p className="text-white font-bold text-sm">{ticket.name}</p>
                    <p className="text-white/70 text-[10px] font-mono">{ticket.id}</p>
                  </div>
                  <span className="text-white text-xs font-bold uppercase">{ticket.category}</span>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Prix</span>
                    <span className="font-bold text-foreground">${ticket.category === "vip" ? 25 : 20}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-foreground">{new Date(ticket.date).toLocaleDateString("fr-FR")}</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-white p-2 rounded-lg">
                      <QRCodeSVG
                        value={JSON.stringify({
                          id: ticket.id,
                          name: ticket.name,
                          category: ticket.category,
                          verified: true,
                        })}
                        size={120}
                        level="H"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTicket(ticket.id)}
                    className="w-full flex items-center justify-center gap-1 py-2 text-xs text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Supprimer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicket;
