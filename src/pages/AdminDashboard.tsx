import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, BarChart3, Users, Ticket, DollarSign, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface TicketRow {
  ticket_id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  price: number;
  created_at: string;
  verified: boolean;
  seller_id: string | null;
}

interface SellerRow {
  id: string;
  name: string;
  active: boolean;
}

interface SellerStats {
  name: string;
  total: number;
  standard: number;
  vip: number;
  revenue: number;
}

const ADMIN_PASSWORD = "admin2026HCM";

const AdminDashboard = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [sellers, setSellers] = useState<SellerRow[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    const fetchData = async () => {
      setLoading(true);
      const [ticketsRes, sellersRes] = await Promise.all([
        supabase.from("tickets").select("*").order("created_at", { ascending: false }),
        supabase.from("sellers").select("*"),
      ]);
      if (ticketsRes.data) setTickets(ticketsRes.data);
      if (sellersRes.data) setSellers(sellersRes.data);
      setLoading(false);
    };
    fetchData();
  }, [authed]);

  const totalRevenue = tickets.reduce((s, t) => s + t.price, 0);
  const standardCount = tickets.filter((t) => t.category === "standard").length;
  const vipCount = tickets.filter((t) => t.category === "vip").length;

  const sellerStats: SellerStats[] = sellers.map((s) => {
    const sellerTickets = tickets.filter((t) => t.seller_id === s.id);
    return {
      name: s.name,
      total: sellerTickets.length,
      standard: sellerTickets.filter((t) => t.category === "standard").length,
      vip: sellerTickets.filter((t) => t.category === "vip").length,
      revenue: sellerTickets.reduce((sum, t) => sum + t.price, 0),
    };
  });

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Retour au site
          </Link>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground mt-1">Accès réservé aux administrateurs</p>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Mot de passe admin"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
                {pwError && <p className="text-destructive text-xs mt-1">Mot de passe incorrect</p>}
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                Accéder
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Retour au site
        </Link>

        <div className="text-center mb-6">
          <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-xs text-muted-foreground">Marche de santé 2026 — Suivi des ventes</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Chargement...</div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={<Ticket className="w-5 h-5" />} label="Total billets" value={tickets.length} />
              <StatCard icon={<DollarSign className="w-5 h-5" />} label="Revenus" value={`$${totalRevenue}`} />
              <StatCard icon={<Users className="w-5 h-5" />} label="Standard" value={standardCount} color="text-primary" />
              <StatCard icon={<TrendingUp className="w-5 h-5" />} label="VIP" value={vipCount} color="text-yellow-500" />
            </div>

            {/* Seller Stats */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-md">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Ventes par vendeur
              </h2>
              {sellerStats.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucun vendeur</p>
              ) : (
                <div className="space-y-3">
                  {sellerStats.map((s) => (
                    <div key={s.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{s.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.standard} standard · {s.vip} VIP
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{s.total} billets</p>
                        <p className="text-xs text-primary font-medium">${s.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* All Tickets Table */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-md overflow-x-auto">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" /> Tous les billets ({tickets.length})
              </h2>
              {tickets.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucun billet vendu</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-2 pr-3">ID</th>
                      <th className="pb-2 pr-3">Nom</th>
                      <th className="pb-2 pr-3 hidden sm:table-cell">Email</th>
                      <th className="pb-2 pr-3">Cat.</th>
                      <th className="pb-2 pr-3">Prix</th>
                      <th className="pb-2 pr-3 hidden md:table-cell">Vendeur</th>
                      <th className="pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((t) => {
                      const sellerName = sellers.find((s) => s.id === t.seller_id)?.name || "—";
                      return (
                        <tr key={t.ticket_id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="py-2 pr-3 font-mono text-xs">{t.ticket_id.slice(0, 12)}…</td>
                          <td className="py-2 pr-3 font-medium text-foreground">{t.name}</td>
                          <td className="py-2 pr-3 hidden sm:table-cell text-muted-foreground">{t.email}</td>
                          <td className="py-2 pr-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              t.category === "vip" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-primary/10 text-primary"
                            }`}>
                              {t.category.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2 pr-3 font-medium">${t.price}</td>
                          <td className="py-2 pr-3 hidden md:table-cell text-muted-foreground">{sellerName}</td>
                          <td className="py-2 text-muted-foreground">{new Date(t.created_at).toLocaleDateString("fr-FR")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color?: string }) => (
  <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
    <div className={`mx-auto mb-1 ${color || "text-primary"}`}>{icon}</div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export default AdminDashboard;
