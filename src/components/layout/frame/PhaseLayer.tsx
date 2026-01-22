import { motion } from "framer-motion";
import React from "react";

type PhaseLayerProps = {
  layerKey: string;
  className?: string;
  children: React.ReactNode;
};

export function PhaseLayer({ layerKey, className, children }: PhaseLayerProps) {
  return (
    <motion.div
      key={layerKey}
      className={className}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
