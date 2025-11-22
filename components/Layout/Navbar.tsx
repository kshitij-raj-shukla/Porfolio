import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Cuboid as Cube } from 'lucide-react';
import { NAV_ITEMS } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-500 transition-colors">
            <Cube className="w-6 h-6 text-white" />
          </div>
          <span className={`font-bold text-xl tracking-tight hidden sm:block ${darkMode ? 'text-white' : 'text-black'}`}>Kshitij Raj Shukla</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-2 py-1 text-sm font-medium transition-colors hover:text-red-500 ${
                location.pathname === item.path 
                  ? 'text-red-500' 
                  : darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-red-600"
                />
              )}
            </Link>
          ))}
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-red-600" />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2">
             {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-red-600" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={`p-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-24 left-6 right-6 p-4 rounded-xl md:hidden flex flex-col gap-4 ${darkMode ? 'glass-panel' : 'bg-white shadow-xl border border-gray-200'}`}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium p-2 rounded-lg hover:bg-red-500/10 ${
                   location.pathname === item.path 
                    ? 'text-red-600' 
                    : darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;