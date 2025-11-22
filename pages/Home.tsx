import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroScene from '../components/Three/HeroScene';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';

const Typewriter = ({ text, delay = 100 }: { text: string, delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden pointer-events-none">

      
      
      <div className="max-w-7xl mx-auto px-6 w-full z-10 flex flex-col lg:flex-row items-center">
        
        {/* Text Content - Expanded width to ensure single line name */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left backdrop-blur-sm lg:backdrop-blur-none p-6 rounded-2xl bg-black/20 lg:bg-transparent w-full lg:w-[80%] pointer-events-auto"
        >
          {/* Profile Picture Container */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
            className="w-32 h-32 md:w-40 md:h-40 mb-8 rounded-full p-1 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 mx-auto lg:mx-0 relative group shadow-[0_0_30px_rgba(220,38,38,0.3)]"
          >
             <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden relative">
                <a href="https://ibb.co/d4xtnPfv"><img 
                  src="https://i.ibb.co/0yvKPCnL/mes2.png" 
                  alt="Kshitij Raj Shukla" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                /></a>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1 mb-4 text-xs font-mono text-red-500 border border-red-500/30 rounded-full bg-red-500/10"
          >
            FULL STACK DEVELOPER
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight dark:text-white text-black">
            Hi, I’m <br />
            <span className="text-gradient whitespace-nowrap block mt-2">
              <Typewriter text="Kshitij Raj Shukla" delay={100} />
            </span>
          </h1>
          
          <p className="text-gray-500 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Building futuristic web experiences with modern technologies. 
            Specializing in MERN stack, Java, and 3D interactions.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <Link to="/projects">
              <button className="group relative px-8 py-3 bg-red-600 text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                <span className="relative z-10 flex items-center gap-2">
                  View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
            </Link>
            <a href="https://drive.google.com/uc?export=download&id=1P7_kNW2iQ_d48gtFGUTWsD6kC4UM74L6" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3 border border-red-500/20 hover:bg-red-500/10 dark:text-white text-black rounded-full font-medium transition-all backdrop-blur-sm flex items-center gap-2">
                <span>Resume</span>
                <FileText className="w-4 h-4" />
              </button>
            </a>
            <Link to="/contact">
              <button className="px-8 py-3 border border-red-500/20 hover:bg-red-500/10 dark:text-white text-black rounded-full font-medium transition-all backdrop-blur-sm">
                Contact Me
              </button>
            </Link>
          </div>

          <div className="flex gap-6 justify-center lg:justify-start">
            {[
              { icon: Github, href: "https://github.com/kshitij-raj-shukla" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/kshitij-raj-shukla/" },
              { icon: Mail, href: "mailto:kshitij.raj55@gmail.com" }
            ].map((Social, idx) => (
              <motion.a
                key={idx}
                href={Social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: '#ef4444' }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Spacer to push content left and allow 3D background visibility on right */}
        <div className="hidden lg:block w-[20%]"></div>
      </div>
    </div>
  );
};

export default Home;