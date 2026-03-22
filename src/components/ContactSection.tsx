import { useState } from "react";
import { motion } from "framer-motion";
import { Send, UserPlus, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [joinMode, setJoinMode] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Message envoyé", description: "Nous vous répondrons dans les meilleurs délais." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {joinMode ? "Rejoindre l'initiative" : "Nous contacter"}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />

          <div className="flex justify-center gap-3">
            <Button variant={joinMode ? "outline" : "default"} size="sm" onClick={() => setJoinMode(false)}>
              <Send size={16} className="mr-2" /> Contact
            </Button>
            <Button variant={joinMode ? "default" : "outline"} size="sm" onClick={() => setJoinMode(true)}>
              <UserPlus size={16} className="mr-2" /> Rejoindre
            </Button>
          </div>
        </motion.div>

        <motion.form
          key={joinMode ? "join" : "contact"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-xl p-8 border shadow-sm space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Nom complet" required name="name" />
            <Input placeholder="Email" type="email" required name="email" />
          </div>
          {joinMode && (
            <Input placeholder="Faculté / Institution" name="institution" />
          )}
          <Textarea placeholder={joinMode ? "Motivation pour rejoindre HCM" : "Votre message"} rows={5} required name="message" />
          <Button type="submit" className="w-full">
            {joinMode ? "Envoyer ma candidature" : "Envoyer le message"}
          </Button>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Phone size={14} />
            <span>+243 89 3777 677 | +243 858 125 358 | +243 826 158 845</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
