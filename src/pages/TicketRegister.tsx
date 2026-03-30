import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, ShieldCheck, User, Mail, Phone, CheckCircle2, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const FALLBACK_PUBLIC_URL = "https://hcm-2026.lovable.app";

interface SellerInfo {
  id: string;
  name: string;
}

interface TicketData {
  id: string;
  ticket_id: string;
  name: string;
  email: string;
  phone: string;
  category: "standard" | "vip";
  date: string;
  verified: boolean;
  seller_name?: string;
}

const TicketRegister = () => {
  const [step, setStep] = useState<"auth" | "form" | "done">("auth");
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [seller, setSeller] = useState<SellerInfo | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "standard" as "standard" | "vip" });
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ticketCardRef = useRef<HTMLDivElement | null>(null);

  const buildVerifyUrl = (payload: { ticket_id: string; name: string; category: string; verified: boolean }) => {
    const origin = typeof window !== "undefined" ? window.location.origin : FALLBACK_PUBLIC_URL;
    return `${origin}/verify?data=${encodeURIComponent(JSON.stringify(payload))}`;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check password against sellers table
    const { data, error } = await supabase
      .from("sellers")
      .select("id, name")
      .eq("password", password)
      .eq("active", true)
      .maybeSingle();

    if (error || !data) {
      setPwError(true);
      return;
    }

    setSeller({ id: data.id, name: data.name });
    setStep("form");
    setPwError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seller) return;

    setIsSubmitting(true);
    const ticketId = `HCM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const price = form.category === "vip" ? 25 : 20;

    const { data, error } = await supabase
      .from("tickets")
      .insert({
        ticket_id: ticketId,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        category: form.category,
        price,
        seller_id: seller.id,
        verified: true,
      })
      .select()
      .single();

    if (error) {
      toast.error("Erreur lors de l'enregistrement du billet");
      setIsSubmitting(false);
      return;
    }

    const newTicket: TicketData = {
      id: data.id,
      ticket_id: data.ticket_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      category: data.category as "standard" | "vip",
      date: data.created_at,
      verified: true,
      seller_name: seller.name,
    };

    // Keep localStorage for offline viewing
    const existing = JSON.parse(localStorage.getItem("hcm_tickets") || "[]");
    existing.push({ ...newTicket, id: newTicket.ticket_id });
    localStorage.setItem("hcm_tickets", JSON.stringify(existing));
    localStorage.setItem("hcm_last_ticket", JSON.stringify({ ...newTicket, id: newTicket.ticket_id }));

    setTicket(newTicket);
    setStep("done");
    setIsSubmitting(false);
  };

  const handleDownloadTicket = async () => {
    if (!ticketCardRef.current || !ticket) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(ticketCardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        filter: (node) => !(node instanceof HTMLElement && node.dataset.downloadIgnore === "true"),
      });
      const link = document.createElement("a");
      link.download = `billet-hcm-${ticket.ticket_id}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Billet téléchargé en PNG");
    } catch {
      toast.error("Impossible de télécharger le billet");
    } finally {
      setIsDownloading(false);
    }
  };

  const price = form.category === "vip" ? 25 : 20;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-primary transition-colors">
          <ArrowLeft className="w-3 h-3" /> Retour au site
        </Link>

        <AnimatePresence mode="wait">
          {/* STEP 1: Password */}
          {step === "auth" && (
            <motion.div key="auth" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Accès Sécurisé</h1>
                <p className="text-xs text-muted-foreground mt-1">Entrez le mot de passe pour enregistrer un billet</p>
              </div>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    required
                  />
                  {pwError && <p className="text-destructive text-xs mt-1">Mot de passe incorrect</p>}
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                  Vérifier
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: Form */}
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Ticket className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Enregistrement du Billet</h1>
                <p className="text-xs text-muted-foreground mt-1">Health Campus Move — Marche de santé 2026</p>
                {seller && <p className="text-xs text-primary mt-1 font-medium">Vendeur : {seller.name}</p>}
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {(["standard", "vip"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                        form.category === cat
                          ? cat === "vip"
                            ? "border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                            : "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {cat === "vip" ? "VIP — $25" : "Standard — $20"}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Nom complet" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none" required maxLength={100} />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none" required maxLength={255} />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="tel" placeholder="Téléphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none" required maxLength={20} />
                </div>

                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground">Montant à payer</p>
                  <p className="text-2xl font-bold text-foreground">${price}</p>
                  <p className="text-xs text-muted-foreground capitalize">{form.category}</p>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60">
                  {isSubmitting ? "Enregistrement..." : "Générer le Billet"}
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 3: Ticket Display */}
          {step === "done" && ticket && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} ref={ticketCardRef} className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
              <div className={`p-5 text-center ${ticket.category === "vip" ? "bg-gradient-to-r from-yellow-500 to-amber-500" : "bg-gradient-to-r from-primary to-primary/80"}`}>
                <CheckCircle2 className="w-10 h-10 text-white mx-auto mb-2" />
                <h2 className="text-lg font-bold text-white">Billet Enregistré !</h2>
                <p className="text-white/80 text-xs">Conservez ce billet dans votre téléphone</p>
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

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Nom</span><span className="font-medium text-foreground">{ticket.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium text-foreground text-right truncate ml-2 max-w-[180px]">{ticket.email}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Téléphone</span><span className="font-medium text-foreground">{ticket.phone}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ID Billet</span><span className="font-mono text-xs text-foreground">{ticket.ticket_id}</span></div>
                </div>

                <div className="border-t-2 border-dashed border-border" />

                <div className="flex justify-center">
                  <div className="bg-white p-3 rounded-xl">
                    <QRCodeSVG
                      value={buildVerifyUrl({ ticket_id: ticket.ticket_id, name: ticket.name, category: ticket.category, verified: true })}
                      size={160}
                      level="H"
                    />
                  </div>
                </div>
                <p className="text-center text-[10px] text-muted-foreground">Présentez ce QR code à l'entrée de l'événement</p>

                <div data-download-ignore="true" className="space-y-2">
                  <div className="flex gap-2">
                    <button onClick={() => { setStep("form"); setForm({ name: "", email: "", phone: "", category: "standard" }); }} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                      Nouveau billet
                    </button>
                    <Link to="/my-ticket" className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium text-center hover:bg-primary/90 transition-colors">
                      Voir mes billets
                    </Link>
                  </div>
                  <button type="button" onClick={handleDownloadTicket} disabled={isDownloading} className="w-full py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    {isDownloading ? "Préparation du PNG..." : "Télécharger le billet (PNG)"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TicketRegister;
