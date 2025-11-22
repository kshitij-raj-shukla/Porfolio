import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="relative w-24 h-24">
        <motion.span
          className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-red-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute top-2 left-2 w-20 h-20 border-4 border-b-transparent border-red-800 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-bold text-white font-mono">
          KS
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-4 text-red-500 font-mono text-sm tracking-widest"
      >
        INITIALIZING SYSTEM...
      </motion.p>
    </div>
  );
};

export default Loader;