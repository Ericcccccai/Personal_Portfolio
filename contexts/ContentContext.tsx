import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContent, Language } from '../types';
import * as CONSTANTS from '../constants';

interface ContentContextType {
  content: AppContent;
  updateContent: (newContent: Partial<AppContent>) => void;
  resetContent: () => void;
  saveToLocalStorage: () => void;
  hasUnsavedChanges: boolean;
  isLoadingCloud: boolean;
  usingCloudData: boolean;
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
  const [isLoadingCloud, setIsLoadingCloud] = useState(false);
  const [usingCloudData, setUsingCloudData] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      // 1. Try loading from Cloud URL if configured
      if (CONSTANTS.EXTERNAL_DATA_URL) {
        setIsLoadingCloud(true);
        try {
          const response = await fetch(CONSTANTS.EXTERNAL_DATA_URL);
          if (response.ok) {
            const cloudData = await response.json();
            // Merge with initial to ensure structure
            setContent(prev => ({ ...prev, ...cloudData }));
            setUsingCloudData(true);
            setIsLoadingCloud(false);
            
            // If cloud load is successful, we don't load local storage immediately
            // to avoid conflicts, UNLESS the user has newer local changes.
            // For simplicity, Cloud > Hardcode. Local Storage > Cloud (draft mode).
          } else {
            console.warn("Failed to fetch cloud content:", response.status);
          }
        } catch (e) {
          console.error("Error fetching cloud content:", e);
        } finally {
          setIsLoadingCloud(false);
        }
      }

      // 2. Override with Local Storage (Drafts)
      const savedContent = localStorage.getItem('zhehao_cai_portfolio_content');
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          // Only override if we really want drafts to persist over cloud
          setContent(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error("Failed to parse saved content", e);
        }
      }
    };

    loadContent();
  }, []);

  const updateContent = (newPart: Partial<AppContent>) => {
    setContent(prev => ({ ...prev, ...newPart }));
    setHasUnsavedChanges(true);
  };

  const saveToLocalStorage = () => {
    const contentToSave = {
        ...content,
        // Strip icons for storage
        socials: content.socials.map(s => ({ ...s, icon: null })), 
        interests: {
            en: content.interests.en.map(i => ({ ...i, icon: null })),
            zh: content.interests.zh.map(i => ({ ...i, icon: null }))
        }
    };
    
    localStorage.setItem('zhehao_cai_portfolio_content', JSON.stringify(contentToSave));
    setHasUnsavedChanges(false);
  };

  const resetContent = () => {
    if (window.confirm("Are you sure? This will discard local changes and reload from the source (Cloud or File).")) {
      localStorage.removeItem('zhehao_cai_portfolio_content');
      window.location.reload();
    }
  };

  // Restore icons if needed
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
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      resetContent, 
      saveToLocalStorage, 
      hasUnsavedChanges,
      isLoadingCloud,
      usingCloudData
    }}>
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