import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContent, Language } from '../types';
import * as CONSTANTS from '../constants';

interface ContentContextType {
  content: AppContent;
  updateContent: (newContent: Partial<AppContent>) => void;
  resetContent: () => void;
  saveToLocalStorage: () => void;
  setManualCloudUrl: (url: string) => void;
  hasUnsavedChanges: boolean;
  isLoadingCloud: boolean;
  usingCloudData: boolean;
  dataSource: 'local_file' | 'local_storage_draft' | 'cloud_constant' | 'cloud_dynamic';
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
  const [dataSource, setDataSource] = useState<'local_file' | 'local_storage_draft' | 'cloud_constant' | 'cloud_dynamic'>('local_file');

  // Trigger a reload when this changes
  const [cloudUrlTrigger, setCloudUrlTrigger] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      // Priority 1: Cloud Data
      // Check Constant first, then LocalStorage override (Dynamic)
      const dynamicUrl = localStorage.getItem('portfolio_raw_url');
      const targetUrl = CONSTANTS.EXTERNAL_DATA_URL || dynamicUrl;

      if (targetUrl) {
        setIsLoadingCloud(true);
        try {
          const response = await fetch(targetUrl);
          if (response.ok) {
            const cloudData = await response.json();
            
            // Merge with initial to ensure structure integrity
            setContent(prev => ({ ...prev, ...cloudData }));
            
            setUsingCloudData(true);
            setDataSource(CONSTANTS.EXTERNAL_DATA_URL ? 'cloud_constant' : 'cloud_dynamic');
            setIsLoadingCloud(false);
            
            // If cloud load is successful, we stop here. 
            // We do NOT load local drafts if cloud is active, unless user explicitly edits.
            return; 
          } else {
            console.warn("Failed to fetch cloud content:", response.status);
          }
        } catch (e) {
          console.error("Error fetching cloud content:", e);
        } finally {
          setIsLoadingCloud(false);
        }
      }

      // Priority 2: Local Storage Drafts (if no cloud or cloud failed)
      const savedContent = localStorage.getItem('zhehao_cai_portfolio_content');
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          setContent(prev => ({ ...prev, ...parsed }));
          setDataSource('local_storage_draft');
        } catch (e) {
          console.error("Failed to parse saved content", e);
        }
      }
    };

    loadContent();
  }, [cloudUrlTrigger]);

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
    setDataSource('local_storage_draft');
  };

  const setManualCloudUrl = (url: string) => {
    if (!url) {
      localStorage.removeItem('portfolio_raw_url');
    } else {
      localStorage.setItem('portfolio_raw_url', url);
    }
    // Force reload
    setCloudUrlTrigger(url || 'reset');
    // Clear local drafts to ensure we see the cloud version
    localStorage.removeItem('zhehao_cai_portfolio_content');
  };

  const resetContent = () => {
    if (window.confirm("Are you sure? This will discard local changes and reload from the source.")) {
      localStorage.removeItem('zhehao_cai_portfolio_content');
      window.location.reload();
    }
  };

  // Restore icons if needed (re-hydration)
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
      setManualCloudUrl,
      hasUnsavedChanges,
      isLoadingCloud,
      usingCloudData,
      dataSource
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