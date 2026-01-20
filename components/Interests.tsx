import React from 'react';
import Section from './ui/Section';
import { Card } from './ui/Card';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { Terminal, Palette, Cpu, Globe } from 'lucide-react';

const Interests: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const interests = content.interests[language];
  const titles = content.sectionTitles[language];

  // Helper to fallback to default icons if stored data has lost them (via simple JSON storage)
  // In a robust app, we'd map string IDs to icons.
  const getIcon = (interest: any, index: number) => {
    if (interest.icon) return interest.icon;
    const icons = [Terminal, Palette, Cpu, Globe];
    return icons[index % icons.length];
  };

  return (
    <Section id="interests" title={titles.interests} subtitle={titles.interestsSubtitle}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {interests.map((interest, idx) => {
          const IconComponent = getIcon(interest, idx);
          return (
            <Card key={interest.id} className="p-6 bg-transparent border-slate-800 hover:bg-slate-800/50">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:text-accent transition-colors group-hover:scale-110 duration-300">
                <IconComponent size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{interest.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{interest.description}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default Interests;