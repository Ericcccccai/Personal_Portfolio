import React from 'react';
import Section from './ui/Section';
import { Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import ResumeDropdown from './ui/ResumeDropdown';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const contactData = content.contact[language];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 relative">
      <Section id="contact" className="pb-10 pt-24">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-16 text-center border border-slate-800 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/20 blur-[50px] rounded-full" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{contactData.title}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            {contactData.text}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="mailto:hello@example.com"
              className="flex items-center gap-2 px-8 py-4 bg-white text-dark rounded-xl font-bold hover:bg-slate-200 transition-colors w-full sm:w-auto justify-center"
            >
              <Mail size={20} />
              {contactData.emailBtn}
            </a>
            
            <ResumeDropdown label={contactData.resumeBtn} />
          </div>

          <div className="flex justify-center gap-8">
            {content.socials.map((social) => (
              <a 
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white hover:scale-110 transition-all p-2 bg-slate-900/50 rounded-full"
                title={social.platform}
              >
                {/* Fallback rendering if icon is missing due to serialization */}
                {social.icon && <social.icon size={24} />}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Alex Dev. Built with React, Tailwind & Framer Motion.</p>
        </div>
      </Section>
    </footer>
  );
};

export default Contact;