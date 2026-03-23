import { motion } from "framer-motion";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
    <path d="M16.004 3.2C9.054 3.2 3.404 8.85 3.404 15.8c0 2.22.58 4.39 1.68 6.3L3.2 28.8l6.9-1.81a12.56 12.56 0 006.004 1.53h.005c6.95 0 12.6-5.65 12.6-12.6 0-3.37-1.31-6.53-3.69-8.91A12.52 12.52 0 0016.004 3.2zm0 23.07a10.45 10.45 0 01-5.33-1.46l-.38-.23-3.96 1.04 1.06-3.87-.25-.4a10.42 10.42 0 01-1.6-5.55c0-5.78 4.7-10.48 10.48-10.48 2.8 0 5.43 1.09 7.41 3.07a10.41 10.41 0 013.07 7.42c0 5.78-4.7 10.48-10.48 10.48l-.02-.02zm5.75-7.85c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.57 1.14 3.08 1.3 3.29.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.87-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37z"/>
  </svg>
);

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/243858125358"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contacter via WhatsApp"
    className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <WhatsAppIcon />
  </motion.a>
);

export default WhatsAppButton;
