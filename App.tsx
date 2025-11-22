import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Layout/Navbar';
import Loader from './components/UI/Loader';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import AskAI from './components/AI/AskAI';
import HeroScene from './components/Three/HeroScene';

// Wrapper to handle page transitions based on location
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

// Global Background Component to handle blur effect
const GlobalBackground3D = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div 
      className={`fixed inset-0 -z-10 transition-all duration-700 ease-in-out ${
        isHome ? 'opacity-100 blur-0' : 'opacity-70 blur-xl pointer-events-none'
      }`}
    >
      {/* <HeroScene /> */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
         <HeroScene />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Toggle Tailwind 'dark' class on the html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative text-black dark:text-white`}>
      {/* Base Solid Background Layer - Low Z-Index to sit behind 3D Scene */}
      <div className={`fixed inset-0 -z-20 transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`} />

      {loading ? (
        <Loader />
      ) : (
        <Router>
          {/* 3D Scene Layer - Z-Index -10 to sit above bg but behind content */}
          <GlobalBackground3D />
          
          <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
          <main className="relative z-0">
            <AnimatedRoutes />
          </main>
          <AskAI />
          
          {/* Footer */}
          <footer className="py-6 text-center text-gray-500 text-sm relative z-10">
            <p>© {new Date().getFullYear()} Kshitij Raj Shukla. Built with React & Three.js</p>
          </footer>
        </Router>
      )}
    </div>
  );
};

export default App;