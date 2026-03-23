import { motion } from "framer-motion";
import { Crown, Briefcase, Users, User } from "lucide-react";

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

const colors = [
  "bg-primary", "bg-accent-foreground", "bg-foreground",
  "bg-primary", "bg-accent-foreground", "bg-foreground",
];

const MemberCard = ({ member, index }: { member: Member; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06 }}
    className="bg-card rounded-xl p-4 border hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
  >
    <div className={`w-11 h-11 rounded-full ${colors[index % colors.length]} text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0`}>
      {getInitials(member.name)}
    </div>
    <div className="min-w-0">
      <p className="font-body font-semibold text-foreground text-sm truncate">{member.name}</p>
      <p className="text-muted-foreground text-xs mt-0.5 truncate">{member.role}</p>
    </div>
  </motion.div>
);

const OrganizationSection = () => (
  <section id="organisation" className="section-padding overflow-hidden">
    <div className="container mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Organisation</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      {/* PDG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 md:p-8 mb-8 text-center text-primary-foreground shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4"
        >
          <Crown size={28} />
        </motion.div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-1">Président Directeur Général</p>
        <p className="font-display text-2xl md:text-3xl font-bold">AP JOEL K.</p>
        <p className="text-primary-foreground/75 text-sm mt-2 max-w-md mx-auto">
          Visionnaire principal. Définit la mission, les valeurs et la direction stratégique de Health Campus Move.
        </p>
      </motion.div>

      {/* Administration */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Briefcase className="text-accent-foreground" size={16} />
          </div>
          <h3 className="font-display text-lg font-bold text-foreground">Administration générale</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {admin.map((m, i) => <MemberCard key={m.name} member={m} index={i} />)}
        </div>
      </div>

      {/* Direction centrale */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Users className="text-accent-foreground" size={16} />
          </div>
          <h3 className="font-display text-lg font-bold text-foreground">Direction centrale</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {central.map((m, i) => <MemberCard key={m.name + m.role} member={m} index={i} />)}
        </div>
      </div>
    </div>
  </section>
);

export default OrganizationSection;
