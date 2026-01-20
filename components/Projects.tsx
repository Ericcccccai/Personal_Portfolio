import React from 'react';
import Section from './ui/Section';
import { Card } from './ui/Card';
import { ExternalLink, Github, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const projects = content.projects[language];
  const titles = content.sectionTitles[language];

  return (
    <Section id="projects" title={titles.projects} subtitle={titles.projectsSubtitle}>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="group flex flex-col h-full">
            <div className="relative aspect-video overflow-hidden bg-slate-900">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  project.category === 'Game' ? 'bg-secondary/90 text-white' : 'bg-primary/90 text-white'
                }`}>
                  {project.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-800 hover:bg-primary hover:text-white rounded-lg transition-colors text-slate-400"
                      title="View Demo"
                    >
                      {project.category === 'Game' ? <Gamepad2 size={18} /> : <ExternalLink size={18} />}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-800 hover:bg-white hover:text-dark rounded-lg transition-colors text-slate-400"
                      title="View Code"
                    >
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-slate-400 mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Projects;