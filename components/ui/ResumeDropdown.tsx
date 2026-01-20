import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

interface ResumeDropdownProps {
  label: string;
  className?: string;
  simpleMode?: boolean; // if true, renders simpler UI (for navbar)
}

const ResumeDropdown: React.FC<ResumeDropdownProps> = ({ label, className = "", simpleMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          simpleMode 
            ? "flex items-center gap-1 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-bold w-full justify-center md:w-auto"
            : "flex items-center gap-2 px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl font-bold hover:border-primary hover:text-primary transition-colors w-full sm:w-auto justify-center group"
        }
      >
        {!simpleMode && <Download size={20} className="group-hover:translate-y-1 transition-transform" />}
        {label}
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-2 w-48 bg-surface border border-slate-700 rounded-xl shadow-xl overflow-hidden ${simpleMode ? 'right-0' : 'left-1/2 -translate-x-1/2 bottom-full mb-4 top-auto'}`}
          >
            <div className="flex flex-col py-1">
              <a 
                href={content.resumeUrls.en} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-between"
                onClick={() => setIsOpen(false)}
              >
                <span>English Resume</span>
                <span className="text-xs font-mono text-slate-500">PDF</span>
              </a>
              <a 
                href={content.resumeUrls.zh} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-between border-t border-slate-700/50"
                onClick={() => setIsOpen(false)}
              >
                <span>中文简历</span>
                <span className="text-xs font-mono text-slate-500">PDF</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeDropdown;