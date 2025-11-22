import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const SkillCategoryCard: React.FC<{ category: typeof SKILLS[0]; index: number }> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-panel p-6 rounded-xl border-l-4 border-red-600 transition-all duration-300
        bg-white shadow-md hover:shadow-lg border-y border-r border-gray-100
        dark:bg-white/5 dark:backdrop-blur-md dark:border-y dark:border-r dark:border-white/10 dark:shadow-none 
        dark:hover:border-red-500/30 dark:hover:bg-white/10"
    >
      <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-500">{category.title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {category.skills.map((skill, idx) => (
          <motion.div 
            key={idx}
            className="flex items-center gap-2 group"
            whileHover={{ x: 5 }}
          >
            <CheckCircle2 className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" />
            <span className="text-sm md:text-base text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Technical Arsenal</h2>
          <p className="text-gray-600 dark:text-gray-400">My expertise across the software development lifecycle.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((category, index) => (
            <SkillCategoryCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Visual Circular Stats (Decorational) */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {['Frontend', 'Backend', 'Database', 'Design'].map((label, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex flex-col items-center group"
            >
              {/* Circular Progress Container */}
              <div className="w-24 h-24 rounded-full flex items-center justify-center relative mb-4 transition-colors
                bg-white dark:bg-white/5 dark:backdrop-blur-sm
                border-4 border-gray-200 dark:border-white/20
                group-hover:border-red-100 dark:group-hover:border-red-500/50"
              >
                {/* Active Spinner */}
                <div className="absolute inset-[-4px] rounded-full border-t-4 border-red-600 animate-spin-slow" />
                
                <span className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors z-10">
                   {90 - (i * 5)}%
                </span>
              </div>
              <span className="font-medium text-gray-600 dark:text-gray-300">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;