import { useState } from "react";
import { motion } from "framer-motion";
import { Send, UserPlus, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { fadeUp, titleReveal } from "@/lib/motion";

const ContactSection = () => {
  const { toast } = useToast();
  const [joinMode, setJoinMode] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Message envoyé", description: "Nous vous répondrons dans les meilleurs délais." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="section-padding overflow-hidden">
      <div className="container mx-auto max-w-lg">
        <motion.div variants={titleReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
            {joinMode ? "Rejoindre l'initiative" : "Nous contacter"}
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-5" />

          <div className="flex justify-center gap-2">
            <Button variant={joinMode ? "outline" : "default"} size="sm" onClick={() => setJoinMode(false)} className="text-xs rounded-full px-4">
              <Send size={14} className="mr-1.5" /> Contact
            </Button>
            <Button variant={joinMode ? "default" : "outline"} size="sm" onClick={() => setJoinMode(true)} className="text-xs rounded-full px-4">
              <UserPlus size={14} className="mr-1.5" /> Rejoindre
            </Button>
          </div>
        </motion.div>

        <motion.form
          key={joinMode ? "join" : "contact"}
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-xl p-6 border shadow-sm space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Nom complet" required name="name" className="text-sm" />
            <Input placeholder="Email" type="email" required name="email" className="text-sm" />
          </div>
          {joinMode && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <Input placeholder="Faculté / Institution" name="institution" className="text-sm" />
            </motion.div>
          )}
          <Textarea placeholder={joinMode ? "Motivation pour rejoindre HCM" : "Votre message"} rows={4} required name="message" className="text-sm" />
          <Button type="submit" className="w-full rounded-full">
            {joinMode ? "Envoyer ma candidature" : "Envoyer le message"}
          </Button>
        </motion.form>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
            <Phone size={13} />
            <a href="tel:+243815050397" className="hover:text-primary transition-colors">+243 815 050 397</a>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
            <Phone size={13} />
            <a href="tel:+243858125358" className="hover:text-primary transition-colors">+243 858 125 358</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
