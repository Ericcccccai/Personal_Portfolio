import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Save, RotateCcw, Copy, Check, Plus, Trash2, Lock, ArrowRight, FileCode, Download } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Project } from '../types';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'projects' | 'export'>('projects');
  const { content, updateContent, saveToLocalStorage, resetContent, hasUnsavedChanges } = useContent();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Simple Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const generateFullFileContent = () => {
    // Reconstruct the full constants.tsx file
    // Note: We use JSON.stringify for dynamic parts. Keys will be quoted, which is valid TS/JS.
    
    return `import { Project, Interest, SocialLink, Experience } from './types';
import { Gamepad2, Code, Terminal, Monitor, Github, Linkedin, Mail, Twitter, Cpu, Palette, Globe } from 'lucide-react';

export const NAV_LINKS = ${JSON.stringify(content.navLinks, null, 2)};

export const HERO_CONTENT = ${JSON.stringify(content.hero, null, 2)};

export const RESUME_URLS = ${JSON.stringify(content.resumeUrls, null, 2)};

export const CURRENT_FOCUS = ${JSON.stringify(content.currentFocus, null, 2)};

export const THEMES = [
  { year: '2026', name: 'Transformative Teal', primary: '#0D9488', secondary: '#2DD4BF' },
  { year: '2025', name: 'Future Dusk', primary: '#483b5b', secondary: '#8a84b5' },
  { year: '2024', name: 'Peach Fuzz', primary: '#FFBE98', secondary: '#FFDAB9' },
  { year: '2023', name: 'Viva Magenta', primary: '#BE3455', secondary: '#E65C7B' },
  { year: '2022', name: 'Very Peri', primary: '#6667AB', secondary: '#8F90D6' },
];

export const GAMES_PLAYED = {
  Shooting: ["Valorant", "Overwatch 1/2", "CrossFire Mobile", "PUBG", "CS:GO/CS2", "Metro: Last Night", "NIKKE", "Strinova"],
  ACT: ["Black Myth: Wukong", "NieR: Automata", "Naraka: Bladepoint"],
  ARPG: ["Genshin Impact", "Honkai Impact 3rd", "Honkai Starrail"],
  Party: ["Among Us", "Goose Goose Duck", "Liar’s Bar", "Rubber Bandits", "Human Fall Flat", "Ultimate Chicken Horse", "Cuphead", "Lethal Company", "Overcooked! 2", "Content Warning", "Fall Guys", "Pico Park", "Super Bunny Man"],
  Puzzle: ["Paper Please", "It Takes Two", "Operation Tango", "Escape the Backrooms", "Plants vs. Zombies", "Escape Simulator"],
  Other: ["Minecraft", "Forza Horizon 5", "Split Fiction", "Arknight"]
};

export const ALL_GAME_TITLES = Object.values(GAMES_PLAYED).flat();

export const BACKGROUND_CONTENT = ${JSON.stringify(content.background, null, 2)};

export const PROJECTS = ${JSON.stringify(content.projects, null, 2)} as unknown as Project[];

// Hardcoded Interests to preserve Icons
export const INTERESTS = {
  en: [
    {
      id: '1',
      title: 'Procedural Generation',
      icon: Terminal,
      description: 'Exploring algorithms like Wave Function Collapse and Perlin Noise to create infinite worlds.'
    },
    {
      id: '2',
      title: 'Game UI/UX',
      icon: Palette,
      description: 'Deconstructing diegetic interfaces and studying how players digest information in real-time.'
    },
    {
      id: '3',
      title: 'Interactive Shaders',
      icon: Cpu,
      description: 'Writing custom shaders to achieve stylized visual effects and performant graphics.'
    },
    {
      id: '4',
      title: 'Web Technologies',
      icon: Globe,
      description: 'Keeping up with the latest web standards to bring game-quality fidelity to the browser.'
    }
  ] as Interest[],
  zh: [
    {
      id: '1',
      title: '程序化生成',
      icon: Terminal,
      description: '探索波函数坍缩和柏林噪声等算法以创造无限的世界。'
    },
    {
      id: '2',
      title: '游戏 UI/UX',
      icon: Palette,
      description: '解构叙事性界面，研究玩家如何实时消化信息。'
    },
    {
      id: '3',
      title: '交互式着色器',
      icon: Cpu,
      description: '编写自定义着色器以实现风格化的视觉效果和高性能图形。'
    },
    {
      id: '4',
      title: 'Web 技术',
      icon: Globe,
      description: '紧跟最新的Web标准，将游戏级的高保真度带入浏览器。'
    }
  ] as Interest[]
};

export const CONTACT_CONTENT = ${JSON.stringify(content.contact, null, 2)};

// Hardcoded Socials to preserve Icons
export const SOCIALS: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com', icon: Github },
  { platform: 'Itch.io', url: 'https://itch.io', icon: Gamepad2 },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { platform: 'Email', url: 'mailto:Eric021202@gmail.com', icon: Mail },
];

export const SECTION_TITLES = ${JSON.stringify(content.sectionTitles, null, 2)};
`;
  };

  const handleSaveToFile = async () => {
    const fileContent = generateFullFileContent();
    let saveSuccessful = false;

    // Attempt 1: File System Access API (Works in Chrome/Edge on Desktop if not in cross-origin iframe)
    try {
      // @ts-ignore
      if (window.showSaveFilePicker) {
        // @ts-ignore
        const handle = await window.showSaveFilePicker({
          suggestedName: 'constants.tsx',
          types: [{
            description: 'TypeScript File',
            accept: { 'text/typescript': ['.tsx', '.ts'] },
          }],
        });
        
        const writable = await handle.createWritable();
        await writable.write(fileContent);
        await writable.close();
        saveSuccessful = true;
        alert('File saved successfully! Your source code is updated.');
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return; // User cancelled
      }
      // Silently fail here to fall back to download, as we might be in an iframe
      console.warn("File System Access API not available or blocked:", err);
    }

    // Attempt 2: Fallback to Download (Universal)
    if (!saveSuccessful) {
      try {
        const blob = new Blob([fileContent], { type: 'text/typescript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'constants.tsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Downloaded "constants.tsx". Please replace your local file with this one.');
      } catch (e) {
        console.error("Download fallback failed:", e);
        alert("Failed to save or download the file.");
      }
    }
  };

  const generateExportCode = () => {
    const jsonProjects = JSON.stringify(content.projects, null, 2);
    return `// REPLACE the PROJECTS constant in constants.tsx with this:

export const PROJECTS = ${jsonProjects} as unknown as Record<string, Project[]>;
`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...content.projects[language]];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    
    updateContent({
      projects: {
        ...content.projects,
        [language]: updatedProjects
      }
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'Web',
      description: 'Description here...',
      technologies: ['Tech 1'],
      imageUrl: 'https://picsum.photos/800/450',
      demoUrl: '',
      repoUrl: '',
      featured: false
    };
    
    updateContent({
      projects: {
        ...content.projects,
        [language]: [...content.projects[language], newProject]
      }
    });
  };

  const removeProject = (index: number) => {
    if(!window.confirm("Delete this project?")) return;
    const updatedProjects = content.projects[language].filter((_, i) => i !== index);
    updateContent({
      projects: {
        ...content.projects,
        [language]: updatedProjects
      }
    });
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="fixed bottom-6 left-6 z-50">
        {!isOpen ? (
          <button 
            onClick={() => setIsOpen(true)}
            className="h-10 w-10 bg-slate-800/80 hover:bg-primary text-slate-400 hover:text-white rounded-full flex items-center justify-center transition-all border border-slate-700 shadow-lg backdrop-blur-sm"
            title="Edit Content"
          >
            <Settings size={18} />
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed inset-y-0 left-0 w-full md:w-[500px] bg-slate-900 border-r border-slate-800 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 min-h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="text-primary" />
                  {isAuthenticated ? `Content Editor (${language.toUpperCase()})` : 'Admin Access'}
                </h2>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              {!isAuthenticated ? (
                <div className="flex-grow flex flex-col justify-center items-center">
                  <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <Lock size={32} />
                      </div>
                      <p className="text-slate-400">Please enter the admin password to edit content.</p>
                      <p className="text-slate-500 text-xs mt-2">(Default: admin)</p>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Password"
                        className={`w-full bg-slate-800 border ${authError ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                        autoFocus
                      />
                      <button 
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                    {authError && (
                      <p className="text-red-400 text-sm text-center">Incorrect password</p>
                    )}
                  </form>
                </div>
              ) : (
                <>
                  {/* Toolbar */}
                  <div className="flex gap-2 mb-6">
                    <button 
                      onClick={saveToLocalStorage}
                      className={`flex-1 py-2 rounded flex items-center justify-center gap-2 font-bold transition-colors ${hasUnsavedChanges ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400'}`}
                      title="Saves to browser storage (temporary)"
                    >
                      <Save size={16} /> Save Local
                    </button>
                    <button 
                      onClick={handleSaveToFile}
                      className="flex-1 py-2 rounded flex items-center justify-center gap-2 font-bold bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors border border-accent/20"
                      title="Download or Overwrite constants.tsx"
                    >
                      <Download size={16} /> Export File
                    </button>
                    <button 
                      onClick={resetContent}
                      className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-red-400 rounded flex items-center justify-center"
                      title="Reset to Default"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-slate-700 mb-6">
                    <button 
                      onClick={() => setActiveTab('projects')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'projects' ? 'border-primary text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                      Projects
                    </button>
                    <button 
                      onClick={() => setActiveTab('general')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'general' ? 'border-primary text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                      General
                    </button>
                    <button 
                      onClick={() => setActiveTab('export')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'export' ? 'border-primary text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                      Export
                    </button>
                  </div>

                  {/* Projects Editor */}
                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                      {content.projects[language].map((project, idx) => (
                        <div key={project.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                          <div className="flex justify-between mb-4">
                            <span className="text-sm font-mono text-slate-500">#{idx + 1}</span>
                            <button onClick={() => removeProject(idx)} className="text-red-400 hover:text-red-300">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-slate-400 block mb-1">Title</label>
                              <input 
                                type="text" 
                                value={project.title} 
                                onChange={(e) => updateProject(idx, 'title', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-primary outline-none"
                              />
                            </div>
                            
                            <div>
                              <label className="text-xs text-slate-400 block mb-1">Description</label>
                              <textarea 
                                value={project.description} 
                                onChange={(e) => updateProject(idx, 'description', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-primary outline-none h-20"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-slate-400 block mb-1">Category</label>
                                <select 
                                    value={project.category}
                                    onChange={(e) => updateProject(idx, 'category', e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-primary outline-none"
                                >
                                    <option value="Game">Game</option>
                                    <option value="Web">Web</option>
                                    <option value="Other">Other</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs text-slate-400 block mb-1">Image URL</label>
                                <input 
                                  type="text" 
                                  value={project.imageUrl} 
                                  onChange={(e) => updateProject(idx, 'imageUrl', e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-primary outline-none"
                                />
                              </div>
                            </div>

                            <div>
                                <label className="text-xs text-slate-400 block mb-1">Links (Leave empty to hide)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input 
                                        placeholder="Demo URL"
                                        type="text" 
                                        value={project.demoUrl || ''} 
                                        onChange={(e) => updateProject(idx, 'demoUrl', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none"
                                    />
                                    <input 
                                        placeholder="Repo URL"
                                        type="text" 
                                        value={project.repoUrl || ''} 
                                        onChange={(e) => updateProject(idx, 'repoUrl', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                              <label className="text-xs text-slate-400 block mb-1">Tech Stack (Comma separated)</label>
                              <input 
                                type="text" 
                                value={project.technologies.join(', ')} 
                                onChange={(e) => updateProject(idx, 'technologies', e.target.value.split(',').map(s => s.trim()))}
                                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-primary outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <button 
                        onClick={addProject}
                        className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-primary hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={20} /> Add Project
                      </button>
                    </div>
                  )}

                  {/* General Editor (Hero) */}
                  {activeTab === 'general' && (
                      <div className="space-y-6">
                          <div className="bg-slate-800/30 p-4 rounded-xl">
                              <h3 className="text-primary font-bold mb-4">Hero Section</h3>
                              <div className="space-y-3">
                                  <div>
                                      <label className="text-xs text-slate-400">Name</label>
                                      <input 
                                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
                                        value={content.hero[language].name}
                                        onChange={(e) => updateContent({ hero: { ...content.hero, [language]: { ...content.hero[language], name: e.target.value } } })}
                                      />
                                  </div>
                                  <div>
                                      <label className="text-xs text-slate-400">Role</label>
                                      <input 
                                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
                                        value={content.hero[language].role}
                                        onChange={(e) => updateContent({ hero: { ...content.hero, [language]: { ...content.hero[language], role: e.target.value } } })}
                                      />
                                  </div>
                                  <div>
                                      <label className="text-xs text-slate-400">Tagline</label>
                                      <textarea 
                                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white h-24"
                                        value={content.hero[language].tagline}
                                        onChange={(e) => updateContent({ hero: { ...content.hero, [language]: { ...content.hero[language], tagline: e.target.value } } })}
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="bg-slate-800/30 p-4 rounded-xl">
                              <h3 className="text-primary font-bold mb-4">Resume Links</h3>
                              <div className="space-y-3">
                                  <div>
                                      <label className="text-xs text-slate-400">English PDF URL</label>
                                      <input 
                                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
                                        value={content.resumeUrls.en}
                                        onChange={(e) => updateContent({ resumeUrls: { ...content.resumeUrls, en: e.target.value } })}
                                      />
                                  </div>
                                  <div>
                                      <label className="text-xs text-slate-400">Chinese PDF URL</label>
                                      <input 
                                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
                                        value={content.resumeUrls.zh}
                                        onChange={(e) => updateContent({ resumeUrls: { ...content.resumeUrls, zh: e.target.value } })}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Export Tab */}
                  {activeTab === 'export' && (
                    <div className="space-y-6">
                      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                         <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                            <FileCode size={20} className="text-accent" />
                            Sync Automatically
                         </h3>
                         <p className="text-sm text-slate-400 mb-4">
                            Click below to generate the <code className="text-primary">constants.tsx</code> file. 
                            <br/><span className="text-xs text-slate-500 italic mt-1 inline-block">(If "Save to Disk" is restricted, a download will start automatically.)</span>
                         </p>
                         <button 
                            onClick={handleSaveToFile}
                            className="w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold bg-accent text-white hover:bg-accent/90 transition-colors"
                         >
                            <Download size={18} /> Export constants.tsx
                         </button>
                      </div>

                      <div>
                        <p className="text-sm text-slate-300 mb-2">
                          Or manually copy the data:
                        </p>
                        
                        <div className="relative">
                          <pre className="bg-black/50 p-4 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto h-64">
                            {generateExportCode()}
                          </pre>
                          <button 
                            onClick={copyToClipboard}
                            className="absolute top-2 right-2 p-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;