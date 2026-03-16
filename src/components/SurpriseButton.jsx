import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play } from 'lucide-react';

const SurpriseButton = () => {
  const [isTriggered, setIsTriggered] = useState(false);

  const fireConfettiRain = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#08f7fe', '#b026ff']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff007f', '#09fbd3']
      });
    }, 250);
  };

  const fireFireworks = () => {
    const end = Date.now() + 4000;
    const colors = ['#ff007f', '#b026ff', '#08f7fe'];
    
    (function frame() {
      confetti({
        particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: colors
      });
      confetti({
        particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: colors
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const handleSurprise = () => {
    if (isTriggered) return;
    setIsTriggered(true);
    
    // Add screen shake class to body
    document.body.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both";
    setTimeout(() => {
        document.body.style.animation = "";
    }, 1000);

    fireFireworks();
    setTimeout(fireConfettiRain, 1000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[40vh] w-full mt-20">
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(176,38,255,1)" }}
        whileTap={{ scale: 0.9, boxShadow: "0 0 100px rgba(176,38,255,1)" }}
        onClick={handleSurprise}
        className="group relative px-12 py-6 rounded-full bg-black border-4 border-neon-purple text-3xl font-black text-white hover:text-neon-cyan transition-colors z-10 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-4">
          <Play fill="currentColor" size={32} className="group-hover:text-neon-cyan text-neon-pink" />
          <span className="tracking-widest neon-text-purple">RUN BIRTHDAY SCRIPT</span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-purple opacity-20 group-hover:opacity-40 transition-opacity blur-md" />
      </motion.button>

      {/* Screen Shake global style inject */}
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-5px, 0, 0); }
          20%, 80% { transform: translate3d(5px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-10px, 0, 0); }
          40%, 60% { transform: translate3d(10px, 0, 0); }
        }
      `}</style>

      {/* Surprise Overlay - The 3D Cake and Text */}
      <AnimatePresence>
        {isTriggered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 50, delay: 0.5 }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              animate={{ rotateY: 360, y: [0, -20, 0] }}
              transition={{ rotateY: { duration: 5, repeat: Infinity, ease: "linear" }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
              className="text-9xl filter drop-shadow-[0_0_30px_rgba(255,0,127,1)]"
            >
              🎂
            </motion.div>
            
            <motion.h2 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 1 }}
              transition={{ duration: 1, delay: 1, type: "spring" }}
              className="mt-12 text-6xl md:text-8xl font-black text-center uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan animate-flicker"
              style={{ padding: '20px' }}
            >
              HAPPY BIRTHDAY LEGEND 🎉
            </motion.h2>

            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={() => setIsTriggered(false)}
              className="pointer-events-auto mt-12 px-8 py-3 bg-white/10 rounded-full border border-white/30 hover:bg-white/20 glass-panel"
            >
              System Shutdown (close)
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SurpriseButton;
