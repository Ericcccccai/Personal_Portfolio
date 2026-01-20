import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContent, Language } from '../types';
import * as CONSTANTS from '../constants';

interface ContentContextType {
  content: AppContent;
  updateContent: (newContent: Partial<AppContent>) => void;
  resetContent: () => void;
  saveToLocalStorage: () => void;
  hasUnsavedChanges: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const INITIAL_CONTENT: AppContent = {
  navLinks: CONSTANTS.NAV_LINKS,
  hero: CONSTANTS.HERO_CONTENT,
  resumeUrls: CONSTANTS.RESUME_URLS,
  currentFocus: CONSTANTS.CURRENT_FOCUS,
  background: CONSTANTS.BACKGROUND_CONTENT,
  projects: CONSTANTS.PROJECTS,
  interests: CONSTANTS.INTERESTS,
  contact: CONSTANTS.CONTACT_CONTENT,
  sectionTitles: CONSTANTS.SECTION_TITLES,
  socials: CONSTANTS.SOCIALS,
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContent>(INITIAL_CONTENT);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const savedContent = localStorage.getItem('alex_dev_portfolio_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        // Merge with initial to ensure new structure keys exist if updated
        setContent({ ...INITIAL_CONTENT, ...parsed });
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  const updateContent = (newPart: Partial<AppContent>) => {
    setContent(prev => ({ ...prev, ...newPart }));
    setHasUnsavedChanges(true);
  };

  const saveToLocalStorage = () => {
    // We strictly save the data that matches the shape of AppContent
    // We filter out icon components which might cause circular JSON issues if they were objects,
    // but in our types they are mostly handled as references. 
    // For safety, we rely on the fact that the initial loading handles the component mapping 
    // (though for true dynamic editing, we'd store string keys for icons).
    // Since this is a dev tool for the author, we assume they won't break the JSON structure too badly.
    
    // Deep clone to avoid mutating state during serialization if needed, 
    // but JSON.stringify ignores functions/components usually.
    // However, Lucide icons are functions. We need to be careful.
    // For this implementation, we will NOT persist the 'icon' property changes in LocalStorage 
    // effectively for the SOCIALS/INTERESTS if they are React components.
    // We will assume 'icon' remains static for now or is handled specially.
    
    // Actually, to make this robust: 
    // We only save the data. When loading, we merge data. 
    // The "Export" function in AdminPanel will handle generating the code string.
    
    // For LocalStorage, we can try stringifying. If it fails due to circular structures (icons),
    // we might need to omit them or store a simplified version. 
    // Given the request is "add projects, links", those are strings.
    
    const contentToSave = {
        ...content,
        // We don't save social icons to LS because they are functions. 
        // We revert to defaults for icons on reload if needed, or mapped by ID.
        // For simplicity, we save everything else.
        socials: content.socials.map(s => ({ ...s, icon: null })), 
        interests: {
            en: content.interests.en.map(i => ({ ...i, icon: null })),
            zh: content.interests.zh.map(i => ({ ...i, icon: null }))
        }
    };
    
    localStorage.setItem('alex_dev_portfolio_content', JSON.stringify(contentToSave));
    setHasUnsavedChanges(false);
  };

  const resetContent = () => {
    if (window.confirm("Are you sure? This will discard all local changes.")) {
      setContent(INITIAL_CONTENT);
      localStorage.removeItem('alex_dev_portfolio_content');
      setHasUnsavedChanges(false);
    }
  };

  // On load, we need to restore icons if they were nullified
  useEffect(() => {
    if (content.socials[0].icon === null) {
       setContent(prev => ({
           ...prev,
           socials: CONSTANTS.SOCIALS,
           interests: CONSTANTS.INTERESTS
       }))
    }
  }, [content]);

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, saveToLocalStorage, hasUnsavedChanges }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
