import React from 'react';

export type Language = 'en' | 'zh';

export interface Project {
  id: string;
  title: string;
  category: 'Game' | 'Web' | 'Other';
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Interest {
  id: string;
  title: string;
  // We handle icons as string names in JSON/storage, mapped to components at runtime if needed, 
  // but for simplicity in this edit-mode we might keep them static or use a lucide-react name map.
  // For now, we keep the structure but note that dynamic icon adding requires a mapping.
  icon: any; 
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: any;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

// Global Content Structure
export interface AppContent {
  navLinks: Record<Language, { name: string; href: string }[]>;
  hero: Record<Language, {
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    viewWork: string;
    contactMe: string;
    badges: { code: string; design: string; openSource: string };
  }>;
  resumeUrls: Record<Language, string>;
  currentFocus: Record<Language, {
    label: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    linkText: string;
  }>;
  background: Record<Language, {
    title: string;
    summary: string;
    coreFocusTitle: string;
    coreFocusDesc: string;
    skillsTitle: string;
    skills: string[];
  }>;
  projects: Record<Language, Project[]>;
  interests: Record<Language, Interest[]>;
  contact: Record<Language, {
    title: string;
    text: string;
    emailBtn: string;
    resumeBtn: string;
  }>;
  sectionTitles: Record<Language, {
    projects: string;
    projectsSubtitle: string;
    interests: string;
    interestsSubtitle: string;
  }>;
  socials: SocialLink[];
}
