import React, { useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Send, MapPin, Mail, Phone, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // --- CONFIGURATION ---
    // To enable background sending:
    // 1. Sign up at https://www.emailjs.com/ (it's free)
    // 2. Create a service (e.g., Gmail) and a template
    // 3. Replace the values below with your actual keys
    const SERVICE_ID = 'YOUR_SERVICE_ID'; 
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    
    const TARGET_EMAIL = 'kshitij.raj55@gmail.com';

    // Check if keys are set, otherwise use Mailto fallback
    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
        // Fallback: Open default mail client
        const formData = new FormData(formRef.current!);
        const name = formData.get('user_name') as string;
        const email = formData.get('user_email') as string;
        const message = formData.get('message') as string;
        
        const subject = `Portfolio Inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        
        window.location.href = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        setStatus('success');
        if(formRef.current) formRef.current.reset();
        
        setTimeout(() => setStatus('idle'), 3000);
        return;
    }

    // Real EmailJS Implementation
    if (formRef.current) {
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then(() => {
                setStatus('success');
                if(formRef.current) formRef.current.reset();
                setTimeout(() => setStatus('idle'), 5000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            });
    }
  };

  const leftContainerVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const rightContainerVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftContainerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Let's Collaborate</motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
            Have a project in mind or want to discuss new technologies? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </motion.p>

          <div className="space-y-6">
            {[
              { icon: Mail, title: 'Email', value: 'kshitij.raj55@gmail.com' },
              { icon: Phone, title: 'Phone', value: '+91 98765 43210' },
              { icon: MapPin, title: 'Location', value: 'India' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="glass-panel flex items-center gap-4 p-4 rounded-xl transition-colors
                  bg-white shadow-md border border-gray-100
                  dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10 dark:shadow-none dark:hover:border-red-500/30"
              >
                <div className="p-3 bg-red-500/10 rounded-full text-red-600 dark:text-red-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.title}</h4>
                  <p className="font-semibold text-lg text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightContainerVariants}
          className="glass-panel p-8 rounded-2xl
            bg-white shadow-xl border border-gray-100
            dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10 dark:shadow-none"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                name="user_name"
                required 
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg transition-colors outline-none
                  bg-gray-50 border border-gray-200 text-gray-900 focus:border-red-500 focus:ring-1 focus:ring-red-500
                  dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                name="user_email"
                required 
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg transition-colors outline-none
                  bg-gray-50 border border-gray-200 text-gray-900 focus:border-red-500 focus:ring-1 focus:ring-red-500
                  dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea 
                rows={4} 
                name="message"
                required 
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-lg transition-colors outline-none
                  bg-gray-50 border border-gray-200 text-gray-900 focus:border-red-500 focus:ring-1 focus:ring-red-500
                  dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-500"
              ></textarea>
            </motion.div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={status === 'sending'}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                status === 'success' 
                  ? 'bg-green-600 text-white shadow-green-500/20' 
                  : status === 'error'
                  ? 'bg-red-600 text-white shadow-red-500/20'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {status === 'sending' ? (
                'Sending...'
              ) : status === 'success' ? (
                'Message Sent!'
              ) : status === 'error' ? (
                'Failed to Send'
              ) : (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
            </motion.button>
            
            {status === 'error' && (
               <motion.p 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className="text-red-500 text-sm text-center flex items-center justify-center gap-2"
               >
                 <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
               </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;