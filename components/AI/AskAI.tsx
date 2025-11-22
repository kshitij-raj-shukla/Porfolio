import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { PROJECTS, SKILLS } from '../../constants';

// Construct the context data string for the AI
const getSystemInstruction = () => {
  const skillsString = SKILLS.map(cat => `${cat.title}: ${cat.skills.join(', ')}`).join('\n');
  const projectsString = PROJECTS.map(p => `Title: ${p.title}\nDescription: ${p.description}\nTech: ${p.tech.join(', ')}`).join('\n\n');

  return `You are an intelligent AI assistant for Kshitij Raj Shukla's portfolio website.
  Your name is "Kshitij's AI Assistant".
  
  Here is the information about Kshitij:
  
  Name: Kshitij Raj Shukla
  Role: Full Stack Developer
  Email: kshitij.raj55@gmail.com
  Location: India
  
  About: Building futuristic web experiences with modern technologies. Specializing in MERN stack, Java, and 3D interactions.
  
  Skills:
  ${skillsString}
  
  Projects:
  ${projectsString}
  
  Instructions:
  1. Answer questions about Kshitij based strictly on the provided information.
  2. Be friendly, professional, and concise. Keep answers under 3-4 sentences unless asked for detail.
  3. If asked about something not in the info (like Kshitij's favorite food or personal secrets), politely say you don't have that information and steer the conversation back to his professional skills.
  4. You can help visitors navigate by suggesting they visit the Projects or Skills page if relevant.
  5. If someone wants to hire Kshitij, suggest they use the Contact page or email him directly.
  `;
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AskAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Kshitij's AI Assistant. Ask me anything about his projects, skills, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session
  useEffect(() => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: getSystemInstruction(),
        },
      });
      setChatSession(chat);
    } catch (error) {
      console.error("Failed to initialize AI chat:", error);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const result: GenerateContentResponse = await chatSession.sendMessage({ message: userMessage });
      const responseText = result.text || "I'm having trouble connecting right now. Please try again later.";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please check your API connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] rounded-2xl flex flex-col shadow-2xl overflow-hidden
              bg-white border border-gray-200
              dark:bg-[#111111] dark:border-white/10 dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center
              bg-gray-50 border-gray-200
              dark:bg-red-900/10 dark:border-white/10"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="font-semibold text-gray-900 dark:text-white">Ask AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-red-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm dark:bg-white/10 dark:text-gray-200 dark:border dark:border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-white/10 p-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    <span className="w-2 h-2 bg-gray-400 dark:bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 dark:bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 dark:bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50 border-gray-200 dark:bg-[#161616] dark:border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about Kshitij's skills..."
                  className="flex-1 rounded-full px-4 py-2 text-sm outline-none transition-all
                    bg-white border border-gray-300 text-gray-900 focus:border-red-500 focus:ring-1 focus:ring-red-500
                    dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-white shadow-lg hover:shadow-red-500/30 transition-shadow group relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
        
        {/* Notification dot if closed */}
        {!isOpen && messages.length === 1 && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default AskAI;