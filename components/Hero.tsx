import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Gamepad2, Code } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const heroData = content.hero[language];

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-primary text-sm font-mono mb-6">
            {heroData.greeting}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            {heroData.name}
          </h1>
          <h2 className="text-2xl md:text-4xl text-slate-400 font-light mb-8 flex flex-col md:flex-row gap-2 md:items-center justify-center md:justify-start">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold">
              {heroData.role}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0 bg-dark/20 backdrop-blur-sm p-4 rounded-xl border border-white/5">
            {heroData.tagline}
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 flex items-center gap-2 group w-full md:w-auto justify-center"
            >
              <Gamepad2 className="group-hover:rotate-12 transition-transform" />
              {heroData.viewWork}
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-surface/80 backdrop-blur-sm text-white border border-slate-700 rounded-lg font-bold hover:border-primary/50 hover:text-primary transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
            >
              {heroData.contactMe}
            </a>
          </div>

          <div className="mt-16 flex items-center gap-8 justify-center md:justify-start text-slate-500">
             <div className="flex items-center gap-2">
                <Code size={20} className="text-accent" />
                <span className="text-sm">{heroData.badges.code}</span>
             </div>
             <div className="flex items-center gap-2">
                <Gamepad2 size={20} className="text-secondary" />
                <span className="text-sm">{heroData.badges.design}</span>
             </div>
             <div className="flex items-center gap-2">
                <Github size={20} className="text-primary" />
                <span className="text-sm">{heroData.badges.openSource}</span>
             </div>
          </div>
        </motion.div>
      </div>

      <motion.a 
        href="#background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-primary transition-colors cursor-pointer z-20"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
};

export default Hero;