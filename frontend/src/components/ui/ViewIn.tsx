import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Animación de entrada estándar de cada vista (sustituye a la clase CSS .view-in del diseño original).
export function ViewIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
