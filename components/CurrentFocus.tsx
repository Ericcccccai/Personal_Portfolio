import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const CurrentFocus: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const focusData = content.currentFocus[language];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-10 -mt-10 relative z-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-surface/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-xl hover:shadow-primary/10 transition-shadow duration-300"
      >
        <div className="flex-shrink-0 bg-primary/20 p-4 rounded-xl text-primary relative">
          <Sparkles size={28} />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-wider">{focusData.label}</h3>
            <span className="h-px w-8 bg-slate-700"></span>
          </div>
          <h4 className="text-xl font-bold text-white mb-2">{focusData.title}</h4>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
            {focusData.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {focusData.tags.map(tag => (
              <span key={tag} className="text-xs font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-slate-800">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 mt-2 md:mt-0">
          <a 
            href={focusData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-slate-300 hover:text-primary transition-colors font-semibold text-sm"
          >
            {focusData.linkText}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default CurrentFocus;