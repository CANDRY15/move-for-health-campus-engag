import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, BarChart3, Users, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminStats from "@/components/admin/AdminStats";
import AdminSellers from "@/components/admin/AdminSellers";
import AdminGallery from "@/components/admin/AdminGallery";

const ADMIN_EMAIL = "healthcampusmove2026@gmail.com";
const ADMIN_PASSWORD = "admin2026HCM";

type Tab = "stats" | "sellers" | "gallery";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "stats", label: "Statistiques", icon: <BarChart3 className="w-4 h-4" /> },
  { key: "sellers", label: "Vendeurs", icon: <Users className="w-4 h-4" /> },
  { key: "gallery", label: "Galerie", icon: <Image className="w-4 h-4" /> },
];

const AdminDashboard = () => {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const [tickets, setTickets] = useState<any[]>([]);
  const [sellers, setSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Email ou mot de passe incorrect");
    }
  };

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

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

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
              <h1 className="text-xl font-bold text-foreground">Marche de santé 2026</h1>
              <p className="text-xs text-muted-foreground mt-1">Tableau de bord administrateur</p>
            </div>
            <form onSubmit={handleAuth} className="space-y-3">
              <input
                type="email"
                placeholder="Email admin"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setLoginError(""); }}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
              {loginError && <p className="text-destructive text-xs">{loginError}</p>}
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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Retour
          </Link>
          <button onClick={() => setAuthed(false)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
            Déconnexion
          </button>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Marche de santé 2026</h1>
          <p className="text-xs text-muted-foreground">Health Campus Move — Tableau de bord</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted/50 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Chargement...</div>
        ) : (
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {activeTab === "stats" && <AdminStats tickets={tickets} sellers={sellers} />}
            {activeTab === "sellers" && <AdminSellers sellers={sellers} onRefresh={fetchData} />}
            {activeTab === "gallery" && <AdminGallery />}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
