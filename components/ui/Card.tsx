import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick, hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-surface border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};