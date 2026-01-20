import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Save, RotateCcw, Copy, Check, Plus, Trash2, Lock, ArrowRight, FileCode, Download, Upload, Cloud, Github, Loader2, Link as LinkIcon, AlertTriangle, Database } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Project } from '../types';
import { EXTERNAL_DATA_URL } from '../constants';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'projects' | 'cloud' | 'export'>('projects');
  const { content, updateContent, saveToLocalStorage, resetContent, hasUnsavedChanges, usingCloudData, dataSource, setManualCloudUrl } = useContent();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Cloud Sync
  const [githubToken, setGithubToken] = useState('');
  const [gistId, setGistId] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');
  const [rawUrl, setRawUrl] = useState('');

  // Manual URL Input
  const [manualUrlInput, setManualUrlInput] = useState('');

  useEffect(() => {
    // Load config
    const savedToken = localStorage.getItem('portfolio_gh_token');
    const savedGistId = localStorage.getItem('portfolio_gist_id');
    // We check the content context for the active dynamic url
    const savedRawUrl = localStorage.getItem('portfolio_raw_url') || EXTERNAL_DATA_URL;

    if (savedToken) setGithubToken(savedToken);
    if (savedGistId) setGistId(savedGistId);
    if (savedRawUrl) {
        setRawUrl(savedRawUrl);
        setManualUrlInput(savedRawUrl);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handlePublishToCloud = async () => {
    if (!githubToken) {
        setSyncStatus('error');
        setSyncMessage('Please enter a GitHub Personal Access Token');
        return;
    }

    setIsSyncing(true);
    setSyncStatus('idle');
    setSyncMessage('');

    try {
        const payload = {
            ...content,
            socials: content.socials.map(s => ({ ...s, icon: null })),
            interests: {
                en: content.interests.en.map(i => ({ ...i, icon: null })),
                zh: content.interests.zh.map(i => ({ ...i, icon: null }))
            }
        };

        const files = {
            "portfolio-content.json": {
                content: JSON.stringify(payload, null, 2)
            }
        };

        let url = 'https://api.github.com/gists';
        let method = 'POST';

        if (gistId) {
            url = `https://api.github.com/gists/${gistId}`;
            method = 'PATCH';
        }

        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: "Zhehao Cai Portfolio Content (Auto-generated)",
                public: false,
                files
            })
        });

        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status}`);
        }

        const data = await response.json();
        const newRawUrl = data.files["portfolio-content.json"].raw_url;
        
        setGistId(data.id);
        setRawUrl(newRawUrl);
        setManualUrlInput(newRawUrl);
        
        // Save Everything
        localStorage.setItem('portfolio_gh_token', githubToken);
        localStorage.setItem('portfolio_gist_id', data.id);
        
        // Update Context Immediately
        setManualCloudUrl(newRawUrl);
        
        setSyncStatus('success');
        setSyncMessage('Published & Applied!');
    } catch (error: any) {
        setSyncStatus('error');
        setSyncMessage(error.message || 'Failed to publish');
    } finally {
        setIsSyncing(false);
    }
  };

  const handleApplyManualUrl = () => {
      setManualCloudUrl(manualUrlInput);
      setRawUrl(manualUrlInput);
      alert('Cloud URL applied to this session!');
  };

  const generateFullFileContent = () => {
    return `import { Project, Interest, SocialLink, Experience } from './types';
import { Gamepad2, Code, Terminal, Monitor, Github, Linkedin, Mail, Twitter, Cpu, Palette, Globe } from 'lucide-react';

/**
 * CLOUD CONFIGURATION
 */
export const EXTERNAL_DATA_URL = "${rawUrl || ""}";

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
export const INTERESTS = {
  en: [
    { id: '1', title: 'Procedural Generation', icon: Terminal, description: 'Exploring algorithms like Wave Function Collapse and Perlin Noise to create infinite worlds.' },
    { id: '2', title: 'Game UI/UX', icon: Palette, description: 'Deconstructing diegetic interfaces and studying how players digest information in real-time.' },
    { id: '3', title: 'Interactive Shaders', icon: Cpu, description: 'Writing custom shaders to achieve stylized visual effects and performant graphics.' },
    { id: '4', title: 'Web Technologies', icon: Globe, description: 'Keeping up with the latest web standards to bring game-quality fidelity to the browser.' }
  ] as Interest[],
  zh: [
    { id: '1', title: '程序化生成', icon: Terminal, description: '探索波函数坍缩和柏林噪声等算法以创造无限的世界。' },
    { id: '2', title: '游戏 UI/UX', icon: Palette, description: '解构叙事性界面，研究玩家如何实时消化信息。' },
    { id: '3', title: '交互式着色器', icon: Cpu, description: '编写自定义着色器以实现风格化的视觉效果和高性能图形。' },
    { id: '4', title: 'Web 技术', icon: Globe, description: '紧跟最新的Web标准，将游戏级的高保真度带入浏览器。' }
  ] as Interest[]
};
export const CONTACT_CONTENT = ${JSON.stringify(content.contact, null, 2)};
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
    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'constants.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Downloaded "constants.tsx". Replace the file in your code editor.');
  };

  const generateExportCode = () => {
    const jsonProjects = JSON.stringify(content.projects, null, 2);
    return `export const PROJECTS = ${jsonProjects} as unknown as Record<string, Project[]>;`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...content.projects[language]];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    updateContent({ projects: { ...content.projects, [language]: updatedProjects } });
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
          if (!window.confirm("This image is large (>500KB). It might make Cloud Sync slow. Continue?")) return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
            updateProject(index, 'imageUrl', reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'Game',
      description: 'Description here...',
      technologies: ['Tech'],
      imageUrl: 'https://picsum.photos/800/450',
      demoUrl: '',
      repoUrl: '',
      featured: false
    };
    updateContent({ projects: { ...content.projects, [language]: [...content.projects[language], newProject] } });
  };

  const removeProject = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if(!window.confirm("Delete this project?")) return;
    const updatedProjects = content.projects[language].filter((_, i) => i !== index);
    updateContent({ projects: { ...content.projects, [language]: updatedProjects } });
  };

  // Helper to get status text
  const getStatusText = () => {
      switch(dataSource) {
          case 'cloud_constant': return 'Connected (File)';
          case 'cloud_dynamic': return 'Connected (Session)';
          case 'local_storage_draft': return 'Local Draft';
          default: return 'Static File';
      }
  };

  const getStatusColor = () => {
      switch(dataSource) {
          case 'cloud_constant': 
          case 'cloud_dynamic': return 'text-emerald-400';
          case 'local_storage_draft': return 'text-amber-400';
          default: return 'text-slate-400';
      }
  };

  return (
    <>
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
            className="fixed inset-y-0 left-0 w-full md:w-[550px] bg-slate-900 border-r border-slate-800 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 min-h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Settings className="text-primary" />
                        {isAuthenticated ? `Content Editor` : 'Admin Access'}
                    </h2>
                    <span className={`text-xs flex items-center gap-1 mt-1 ${getStatusColor()}`}>
                        <Database size={10} /> {getStatusText()}
                    </span>
                </div>
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
                      <p className="text-slate-400">Enter Admin Password</p>
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
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex gap-2 mb-6">
                    <button 
                      onClick={saveToLocalStorage}
                      className={`flex-1 py-2 rounded flex items-center justify-center gap-2 font-bold transition-colors ${hasUnsavedChanges ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50' : 'bg-slate-800 text-slate-400'}`}
                      title="Saves to browser storage (Draft)"
                    >
                      <Save size={16} /> Save Draft
                    </button>
                    <button 
                      onClick={() => setActiveTab('cloud')}
                      className={`flex-1 py-2 rounded flex items-center justify-center gap-2 font-bold border transition-colors ${activeTab === 'cloud' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'}`}
                      title="Sync with GitHub Gist"
                    >
                      <Cloud size={16} /> Go Live
                    </button>
                  </div>

                  <div className="flex border-b border-slate-700 mb-6">
                    {['Projects', 'General', 'Cloud', 'Export'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase() as any)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.toLowerCase() ? 'border-primary text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                  </div>

                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                      {content.projects[language].map((project, idx) => (
                        <div key={project.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative">
                          <div className="flex justify-between mb-4">
                            <span className="text-sm font-mono text-slate-500">#{idx + 1}</span>
                            <button type="button" onClick={(e) => removeProject(e, idx)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1 rounded transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="space-y-3">
                            <input type="text" value={project.title} onChange={(e) => updateProject(idx, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-primary outline-none" placeholder="Title"/>
                            <textarea value={project.description} onChange={(e) => updateProject(idx, 'description', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-primary outline-none h-20" placeholder="Description"/>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <select value={project.category} onChange={(e) => updateProject(idx, 'category', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white">
                                    <option value="Game">Game</option>
                                    <option value="Web">Web</option>
                                    <option value="Other">Other</option>
                                </select>
                                
                                <div className="flex gap-2 items-center">
                                    <input 
                                        type="text" 
                                        value={project.imageUrl}
                                        onChange={(e) => updateProject(idx, 'imageUrl', e.target.value)}
                                        placeholder="https://... or Upload ->"
                                        className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white"
                                    />
                                    <label className="cursor-pointer h-[38px] w-[38px] bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors relative" title="Upload Image">
                                        <Upload size={14} />
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => handleImageUpload(idx, e)} />
                                    </label>
                                </div>
                            </div>

                            {project.imageUrl && (
                                <div className="mt-2 relative w-full h-32 bg-slate-900 rounded overflow-hidden border border-slate-700 group">
                                    <img src={project.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-2">
                                <input placeholder="Demo URL" type="text" value={project.demoUrl || ''} onChange={(e) => updateProject(idx, 'demoUrl', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white"/>
                                <input placeholder="Repo URL" type="text" value={project.repoUrl || ''} onChange={(e) => updateProject(idx, 'repoUrl', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white"/>
                            </div>
                            <input type="text" value={project.technologies.join(', ')} onChange={(e) => updateProject(idx, 'technologies', e.target.value.split(',').map(s => s.trim()))} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" placeholder="Technologies"/>
                          </div>
                        </div>
                      ))}
                      <button onClick={addProject} className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-primary hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"><Plus size={20} /> Add Project</button>
                    </div>
                  )}

                  {activeTab === 'general' && (
                    <div className="space-y-6">
                        {/* Simplified General Tab for Brevity in Code */}
                        <div className="bg-slate-800/30 p-4 rounded-xl">
                            <h3 className="text-primary font-bold mb-4">Hero Section</h3>
                            <div className="space-y-3">
                                <label className="text-xs text-slate-400">Name</label>
                                <input className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" value={content.hero[language].name} onChange={(e) => updateContent({ hero: { ...content.hero, [language]: { ...content.hero[language], name: e.target.value } } })}/>
                                <label className="text-xs text-slate-400">Role</label>
                                <input className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" value={content.hero[language].role} onChange={(e) => updateContent({ hero: { ...content.hero, [language]: { ...content.hero[language], role: e.target.value } } })}/>
                            </div>
                        </div>
                    </div>
                  )}

                  {activeTab === 'cloud' && (
                      <div className="space-y-6">
                          <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/30 rounded-xl p-6">
                              <div className="flex items-center gap-3 mb-4">
                                  <Cloud className="text-emerald-400" size={24} />
                                  <h3 className="text-white font-bold text-lg">Cloud Sync</h3>
                              </div>
                              <div className="space-y-4">
                                  <div>
                                      <label className="text-xs text-slate-400 mb-1 block">GitHub Personal Access Token</label>
                                      <input type="password" value={githubToken} onChange={(e) => setGithubToken(e.target.value)} placeholder="ghp_..." className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-emerald-500 outline-none font-mono text-sm"/>
                                      <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:underline mt-1 inline-block">Get Token</a>
                                  </div>
                                  <button onClick={handlePublishToCloud} disabled={isSyncing || !githubToken} className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${isSyncing ? 'bg-slate-700 text-slate-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}>
                                      {isSyncing ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                                      {isSyncing ? 'Syncing...' : (gistId ? 'Update Live Site' : 'Publish to Cloud')}
                                  </button>
                                  {syncStatus === 'success' && <div className="text-emerald-400 text-sm flex items-center gap-2"><Check size={16}/> {syncMessage}</div>}
                                  {syncStatus === 'error' && <div className="text-red-400 text-sm flex items-center gap-2"><AlertTriangle size={16}/> {syncMessage}</div>}
                              </div>
                          </div>
                          
                          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                  <LinkIcon size={16} className="text-primary" /> Manual Connection
                              </h4>
                              <p className="text-xs text-slate-400 mb-3">
                                  If "Connect to Repo" failed, paste your Gist URL here to see changes immediately.
                              </p>
                              <div className="flex gap-2 mb-3">
                                  <input value={manualUrlInput} onChange={(e) => setManualUrlInput(e.target.value)} className="flex-1 bg-black/50 border border-slate-700 rounded px-3 py-2 text-slate-300 text-xs font-mono" placeholder="https://gist.githubusercontent.com/..."/>
                                  <button onClick={handleApplyManualUrl} className="px-4 bg-slate-700 hover:bg-white hover:text-dark text-white rounded text-xs font-bold transition-colors">Apply</button>
                              </div>
                              <button onClick={handleSaveToFile} className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-medium flex items-center justify-center gap-2">
                                  <Download size={14} /> Download Updated constants.tsx
                              </button>
                          </div>
                      </div>
                  )}

                  {activeTab === 'export' && (
                    <div className="space-y-6">
                        <button onClick={handleSaveToFile} className="w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold bg-accent text-white hover:bg-accent/90 transition-colors">
                           <Download size={18} /> Export constants.tsx
                        </button>
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