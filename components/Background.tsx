import React from 'react';
import Section from './ui/Section';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Background: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const bgData = content.background[language];

  return (
    <Section id="background" title={bgData.title}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="prose prose-invert prose-lg text-slate-300">
          <p className="leading-relaxed text-lg">
            {bgData.summary}
          </p>
          <div className="mt-8 p-6 bg-surface/50 border border-slate-700 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4" />
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-accent rounded-full" />
              {bgData.coreFocusTitle}
            </h3>
            <p className="text-sm text-slate-400">
              {bgData.coreFocusDesc}
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-8 border border-slate-700 shadow-2xl relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-sm -z-10" />
          <h3 className="text-xl font-mono font-bold text-white mb-6 border-b border-slate-700 pb-2">
            {bgData.skillsTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bgData.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <CheckCircle2 size={18} className="text-accent group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-white transition-colors">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Background;