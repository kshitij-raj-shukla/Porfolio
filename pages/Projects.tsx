import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Github, ExternalLink, Layers } from 'lucide-react';

const ProjectCard: React.FC<{ project: typeof PROJECTS[0]; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ 
        y: -10, 
        rotateX: 2, 
        rotateY: 2,
      }}
      className="glass-panel relative group overflow-hidden min-h-[350px] flex flex-col justify-between rounded-2xl p-6 transition-all duration-300
        bg-white border-gray-200 shadow-lg
        dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10 dark:shadow-none
        hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(220,38,38,0.2)] dark:hover:border-red-500/40"
    >
      {/* Decorative gradient blob - subtle in dark mode */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10 transition-all group-hover:opacity-30 dark:opacity-20 dark:group-hover:opacity-40"
        style={{ backgroundColor: project.color }}
      />

      <div>
        <div className="flex justify-between items-start mb-4">
      
        
          <div 
            className="p-3 rounded-lg mb-4 inline-block bg-gray-50 dark:bg-white/10"
          >
            <Layers className="w-6 h-6" style={{ color: project.color }} />
          </div>
          <div className="flex gap-3 relative z-10">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5 text-gray-500 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400" />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/20 transition-colors">
                <ExternalLink className="w-5 h-5 text-gray-500 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech, i) => (
            <span 
              key={i}
              className="text-xs font-medium px-3 py-1 rounded-full 
                bg-gray-100 text-gray-700 border border-gray-200
                dark:bg-white/10 dark:text-gray-200 dark:border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work involving Full-Stack development, AI integration, and backend systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;