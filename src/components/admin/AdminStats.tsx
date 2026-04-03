import { Ticket, DollarSign, Users, TrendingUp, Download } from "lucide-react";

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

interface Props {
  tickets: TicketRow[];
  sellers: SellerRow[];
}

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color?: string }) => (
  <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
    <div className={`mx-auto mb-1 ${color || "text-primary"}`}>{icon}</div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

const AdminStats = ({ tickets, sellers }: Props) => {
  const totalRevenue = tickets.reduce((s, t) => s + t.price, 0);
  const standardCount = tickets.filter((t) => t.category === "standard").length;
  const vipCount = tickets.filter((t) => t.category === "vip").length;

  const exportCSV = () => {
    const headers = ["ID Billet", "Nom", "Email", "Téléphone", "Catégorie", "Prix", "Vendeur", "Date"];
    const rows = tickets.map((t) => {
      const sellerName = sellers.find((s) => s.id === t.seller_id)?.name || "—";
      return [t.ticket_id, t.name, t.email, t.phone, t.category, `$${t.price}`, sellerName, new Date(t.created_at).toLocaleDateString("fr-FR")];
    });
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ventes-hcm-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const sellerStats = sellers.map((s) => {
    const st = tickets.filter((t) => t.seller_id === s.id);
    return {
      name: s.name,
      total: st.length,
      standard: st.filter((t) => t.category === "standard").length,
      vip: st.filter((t) => t.category === "vip").length,
      revenue: st.reduce((sum, t) => sum + t.price, 0),
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={<Ticket className="w-5 h-5" />} label="Total billets" value={tickets.length} />
        <StatCard icon={<DollarSign className="w-5 h-5" />} label="Revenus" value={`$${totalRevenue}`} />
        <StatCard icon={<Users className="w-5 h-5" />} label="Standard" value={standardCount} />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="VIP" value={vipCount} color="text-yellow-500" />
      </div>

      {/* Seller breakdown */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Ventes par vendeur
        </h2>
        {sellerStats.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucun vendeur configuré</p>
        ) : (
          <div className="space-y-3">
            {sellerStats.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <div>
                  <p className="font-semibold text-foreground text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.standard} standard · {s.vip} VIP</p>
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

      {/* Tickets table */}
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
    </div>
  );
};

export default AdminStats;
