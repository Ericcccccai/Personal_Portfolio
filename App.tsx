import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CurrentFocus from './components/CurrentFocus';
import Background from './components/Background';
import Projects from './components/Projects';
import Interests from './components/Interests';
import Contact from './components/Contact';
import ThemeSwitcher from './components/ThemeSwitcher';
import GameBackground from './components/GameBackground';
import AdminPanel from './components/AdminPanel';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContentProvider } from './contexts/ContentContext';

const App: React.FC = () => {
  return (
    <ContentProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-dark selection:bg-primary selection:text-white relative">
          <GameBackground />
          <Navbar />
          <main className="flex flex-col relative z-10">
            <Hero />
            <CurrentFocus />
            <Background />
            <Projects />
            <Interests />
            <Contact />
          </main>
          <ThemeSwitcher />
          <AdminPanel />
        </div>
      </LanguageProvider>
    </ContentProvider>
  );
};

export default App;