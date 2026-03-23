import { motion } from "framer-motion";
import { Crown, Briefcase, Users } from "lucide-react";

interface Member { name: string; role: string; }

const admin: Member[] = [
  { name: "BEYA TSHIKELE Dan", role: "Directeur Général" },
  { name: "KABONGO NSUNGU Fidèle", role: "Directeur des relations extérieures" },
  { name: "MWAMBA KANONGE Tharcisse", role: "Directeur logistique" },
  { name: "NYUNDO BANZA Kenania", role: "Directeur des ressources humaines" },
];

const central: Member[] = [
  { name: "MUPASA MONGA Marie-Ada", role: "Secrétaire général" },
  { name: "BAKAMPA BIUMA Arlette", role: "Finance" },
  { name: "KABENGA KAMBALE Fabrice", role: "Médias et communication" },
  { name: "KAHENGA MUKUTA MBAYO Juvenal", role: "Gestion des données numériques" },
  { name: "CANDRY SAIDI Chadrack", role: "Gestion des données numériques" },
  { name: "FEZA MISHILA Néhémie", role: "Marketing et communication" },
  { name: "KAZUMA IHEMBA Sarah", role: "Communication et gestion des ventes" },
  { name: "LEMBE KAYUMBA Freddy", role: "Gestion de la sécurité" },
  { name: "USHINDI KALIBWA David", role: "Responsable mobilisation et sport" },
];

const getInitials = (name: string) => {
  const parts = name.split(" ");
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0];
};

const MemberCard = ({ member, index }: { member: Member; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="bg-card rounded-lg p-3 border flex items-center gap-3"
  >
    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
      {getInitials(member.name)}
    </div>
    <div className="min-w-0 flex-1">
      <p className="font-semibold text-foreground text-xs leading-tight">{member.name}</p>
      <p className="text-muted-foreground text-[11px] mt-0.5 leading-tight">{member.role}</p>
    </div>
  </motion.div>
);

const OrganizationSection = () => (
  <section id="organisation" className="section-padding overflow-hidden">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Organisation</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      {/* PDG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 mb-6 text-center text-primary-foreground"
      >
        <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-3">
          <Crown size={22} />
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70 mb-1">Président Directeur Général</p>
        <p className="font-display text-xl font-bold">AP JOEL K.</p>
        <p className="text-primary-foreground/70 text-xs mt-1.5 max-w-sm mx-auto">
          Visionnaire principal et fondateur de Health Campus Move.
        </p>
      </motion.div>

      {/* Administration */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <Briefcase className="text-accent-foreground" size={14} />
          </div>
          <h3 className="font-display text-base font-bold text-foreground">Administration générale</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {admin.map((m, i) => <MemberCard key={m.name} member={m} index={i} />)}
        </div>
      </div>

      {/* Direction centrale */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <Users className="text-accent-foreground" size={14} />
          </div>
          <h3 className="font-display text-base font-bold text-foreground">Direction centrale</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {central.map((m, i) => <MemberCard key={m.name + m.role} member={m} index={i} />)}
        </div>
      </div>
    </div>
  </section>
);

export default OrganizationSection;
