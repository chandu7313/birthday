import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalSquare, Code2, Database, Braces } from 'lucide-react';
import confetti from 'canvas-confetti';

const floatingElements = [
  { id: 1, icon: '🎂', type: 'emoji', size: 'text-5xl', initial: { x: '10vw', y: '20vh' }, delay: 0 },
  { id: 2, icon: '🎈', type: 'emoji', size: 'text-4xl', initial: { x: '80vw', y: '15vh' }, delay: 1 },
  { id: 3, icon: '🎁', type: 'emoji', size: 'text-6xl', initial: { x: '15vw', y: '70vh' }, delay: 2 },
  { id: 4, icon: '🎉', type: 'emoji', size: 'text-4xl', initial: { x: '85vw', y: '65vh' }, delay: 1.5 },
  { id: 5, icon: <TerminalSquare />, type: 'lucide', color: '#08f7fe', initial: { x: '25vw', y: '85vh' }, delay: 0.5 },
  { id: 6, icon: <Code2 />, type: 'lucide', color: '#b026ff', initial: { x: '75vw', y: '30vh' }, delay: 2.5 },
  { id: 7, icon: <Database />, type: 'lucide', color: '#ff007f', initial: { x: '45vw', y: '10vh' }, delay: 3 },
  { id: 8, icon: <Braces />, type: 'lucide', color: '#09fbd3', initial: { x: '55vw', y: '80vh' }, delay: 1.2 },
];

const FloatingImages = () => {

  // Easter Eggs Handling
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Spacebar triggers balloons
      if (e.code === 'Space') {
        e.preventDefault();
        confetti({
           particleCount: 15,
           spread: 60,
           origin: { y: 1 },
           colors: ['#ff007f', '#08f7fe', '#b026ff']
        });
      }
    };

    const handleClick = (e) => {
      // Background click spawns emoji particles (except when clicking buttons/links)
      if (e.target.tagName.toLowerCase() !== 'button' && e.target.tagName.toLowerCase() !== 'a' && e.target.tagName.toLowerCase() !== 'input') {
        confetti({
          particleCount: 8,
          spread: 30,
          origin: { 
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
          },
          colors: ['#09fbd3', '#b026ff']
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingElements.map((el) => {
        return (
          <motion.div
            key={el.id}
            initial={{ opacity: 0, x: el.initial.x, y: el.initial.y }}
            animate={{ 
              opacity: 0.4, 
              y: [`${parseFloat(el.initial.y) - 5}vh`, `${parseFloat(el.initial.y) + 5}vh`, `${parseFloat(el.initial.y) - 5}vh`],
              x: [`${parseFloat(el.initial.x) - 2}vw`, `${parseFloat(el.initial.x) + 2}vw`, `${parseFloat(el.initial.x) - 2}vw`]
            }}
            transition={{
              opacity: { duration: 2, delay: el.delay },
              y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: el.delay },
              x: { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: el.delay }
            }}
            className={`absolute ${el.type === 'emoji' ? el.size : 'w-12 h-12 flex items-center justify-center'}`}
            style={el.type === 'lucide' ? { color: el.color, filter: `drop-shadow(0 0 10px ${el.color})` } : { filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}
          >
            {el.type === 'lucide' && React.cloneElement(el.icon, { size: 48 })}
            {el.type === 'emoji' && el.icon}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingImages;
