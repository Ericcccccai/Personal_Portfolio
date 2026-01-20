import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { THEMES } from '../constants';

// Helper to convert hex to RGB channels for Tailwind opacity variables
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` 
    : '0 0 0';
};

const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(THEMES[0].year);

  const setTheme = (theme: typeof THEMES[0]) => {
    setActiveTheme(theme.year);
    const root = document.documentElement;
    root.style.setProperty('--color-primary', hexToRgb(theme.primary));
    root.style.setProperty('--color-secondary', hexToRgb(theme.secondary));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-surface border border-slate-700 rounded-xl p-4 shadow-2xl mb-2 min-w-[200px]"
          >
            <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider border-b border-slate-700 pb-2">
              Pantone Year
            </div>
            <div className="flex flex-col gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.year}
                  onClick={() => setTheme(theme)}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors w-full text-left group ${
                    activeTheme === theme.year ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <span 
                    className="w-4 h-4 rounded-full border border-slate-600 shadow-sm"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${activeTheme === theme.year ? 'text-white' : 'text-slate-300'}`}>
                      {theme.year}
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-slate-400">
                      {theme.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 bg-surface border border-slate-700 hover:border-primary text-slate-300 hover:text-primary rounded-full shadow-lg flex items-center justify-center transition-all hover:rotate-12"
        title="Change Color Theme"
      >
        {isOpen ? <X size={20} /> : <Palette size={20} />}
      </button>
    </div>
  );
};

export default ThemeSwitcher;