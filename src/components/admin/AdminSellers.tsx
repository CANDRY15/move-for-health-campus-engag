import { useState } from "react";
import { UserPlus, Eye, EyeOff, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SellerRow {
  id: string;
  name: string;
  active: boolean;
  password: string;
}

interface Props {
  sellers: SellerRow[];
  onRefresh: () => void;
}

const AdminSellers = ({ sellers, onRefresh }: Props) => {
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adding, setAdding] = useState(false);
  const [showPw, setShowPw] = useState<Record<string, boolean>>({});
  const [editPw, setEditPw] = useState<Record<string, string>>({});

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPassword.trim()) return;
    setAdding(true);
    const { error } = await supabase.from("sellers").insert({
      name: newName.trim(),
      password: newPassword.trim(),
    });
    if (error) {
      toast.error("Erreur lors de l'ajout du vendeur");
    } else {
      toast.success(`Vendeur "${newName.trim()}" ajouté`);
      setNewName("");
      setNewPassword("");
      onRefresh();
    }
    setAdding(false);
  };

  const toggleActive = async (seller: SellerRow) => {
    const { error } = await supabase
      .from("sellers")
      .update({ active: !seller.active })
      .eq("id", seller.id);
    if (error) {
      toast.error("Erreur");
    } else {
      toast.success(seller.active ? `${seller.name} désactivé` : `${seller.name} activé`);
      onRefresh();
    }
  };

  const deleteSeller = async (seller: SellerRow) => {
    if (!confirm(`Supprimer le vendeur "${seller.name}" ?`)) return;
    const { error } = await supabase.from("sellers").delete().eq("id", seller.id);
    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success(`"${seller.name}" supprimé`);
      onRefresh();
    }
  };

  const updatePassword = async (seller: SellerRow) => {
    const pw = editPw[seller.id];
    if (!pw?.trim()) return;
    const { error } = await supabase
      .from("sellers")
      .update({ password: pw.trim() })
      .eq("id", seller.id);
    if (error) {
      toast.error("Erreur");
    } else {
      toast.success(`Mot de passe de "${seller.name}" mis à jour`);
      setEditPw((prev) => ({ ...prev, [seller.id]: "" }));
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Add seller form */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-primary" /> Ajouter un vendeur
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Nom du vendeur"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            required
            maxLength={50}
          />
          <input
            type="text"
            placeholder="Mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            required
            maxLength={50}
          />
          <button
            type="submit"
            disabled={adding}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {adding ? "..." : "Ajouter"}
          </button>
        </form>
      </div>

      {/* Sellers list */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Vendeurs ({sellers.length})
        </h2>
        {sellers.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucun vendeur</p>
        ) : (
          <div className="space-y-3">
            {sellers.map((s) => (
              <div key={s.id} className={`p-4 rounded-xl border ${s.active ? "border-border bg-muted/20" : "border-destructive/30 bg-destructive/5"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">Mot de passe :</span>
                      <span className="font-mono text-xs text-foreground">
                        {showPw[s.id] ? s.password : "••••••"}
                      </span>
                      <button onClick={() => setShowPw((p) => ({ ...p, [s.id]: !p[s.id] }))} className="text-muted-foreground hover:text-foreground">
                        {showPw[s.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleActive(s)} className={`p-1.5 rounded-lg transition-colors ${s.active ? "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" : "text-muted-foreground hover:bg-muted"}`} title={s.active ? "Désactiver" : "Activer"}>
                      {s.active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    </button>
                    <button onClick={() => deleteSeller(s)} className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors" title="Supprimer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Edit password */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nouveau mot de passe"
                    value={editPw[s.id] || ""}
                    onChange={(e) => setEditPw((p) => ({ ...p, [s.id]: e.target.value }))}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                    maxLength={50}
                  />
                  <button
                    onClick={() => updatePassword(s)}
                    disabled={!editPw[s.id]?.trim()}
                    className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-40"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSellers;
