import { motion } from "framer-motion";
import { Crown, Briefcase, Users } from "lucide-react";

interface Member { name: string; role: string; }

const admin: Member[] = [
  { name: "AP JOEL K.", role: "PDG – Président Directeur Général" },
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
  { name: "KAZUMA IHEMA Sarah", role: "Communication et gestion des ventes" },
  { name: "LEMBE KAYUMBA Freddy", role: "Gestion de la sécurité" },
  { name: "USHINDI KALIBWA David", role: "Responsable mobilisation et sport" },
];

const MemberCard = ({ member, index }: { member: Member; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="bg-card rounded-lg p-5 border hover:shadow-sm transition-shadow"
  >
    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-3">
      {member.name.charAt(0)}
    </div>
    <p className="font-semibold text-foreground text-sm">{member.name}</p>
    <p className="text-muted-foreground text-xs mt-1">{member.role}</p>
  </motion.div>
);

const OrganizationSection = () => (
  <section id="organisation" className="section-padding">
    <div className="container mx-auto max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Organisation</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      {/* PDG highlight */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent/50 rounded-xl p-8 border mb-10 text-center">
        <Crown className="text-primary mx-auto mb-3" size={32} />
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Président Directeur Général</p>
        <p className="font-display text-2xl font-bold text-foreground">AP JOEL K.</p>
        <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">
          Visionnaire principal. Définit la mission, les valeurs et la direction stratégique de Health Campus Move.
        </p>
      </motion.div>

      {/* Administration */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-primary" size={20} />
          <h3 className="font-display text-xl font-bold text-foreground">Administration générale</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {admin.slice(1).map((m, i) => <MemberCard key={m.name} member={m} index={i} />)}
        </div>
      </div>

      {/* Direction centrale */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-primary" size={20} />
          <h3 className="font-display text-xl font-bold text-foreground">Direction centrale</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {central.map((m, i) => <MemberCard key={m.name + m.role} member={m} index={i} />)}
        </div>
      </div>
    </div>
  </section>
);

export default OrganizationSection;
