import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BOOT_MESSAGES = [
  "Initializing system...",
  "Loading friendship database...",
  "Scanning memories...",
  "Compiling birthday wishes...",
  "Deploying celebration build..."
];

const BootSequence = ({ onComplete }) => {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, BOOT_MESSAGES[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 800); // 800ms between each line
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 1500); // Short pause after last message before booting
      return () => clearTimeout(finalTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black text-neon-green font-mono p-8 flex flex-col justify-end pb-24"
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-2">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg md:text-2xl"
          >
            <span className="text-neon-cyan mr-2">&gt;</span> {msg}
          </motion.div>
        ))}
        {currentIndex < BOOT_MESSAGES.length && (
          <motion.div 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-4 h-6 md:h-8 bg-neon-green mt-2"
          />
        )}
      </div>
    </motion.div>
  );
};

export default BootSequence;
