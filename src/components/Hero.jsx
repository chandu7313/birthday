import React from 'react';
import { motion } from 'framer-motion';

const EmojiCube = () => {
  return (
    <div className="w-32 h-32 relative perspective-1000 mx-auto mt-8 mb-12">
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      >
        {/* Front */}
        <div className="absolute w-full h-full glass-panel neon-border flex items-center justify-center text-4xl" style={{ transform: 'translateZ(64px)' }}>
          🎂
        </div>
        {/* Back */}
        <div className="absolute w-full h-full glass-panel neon-border flex items-center justify-center text-4xl" style={{ transform: 'rotateY(180deg) translateZ(64px)' }}>
          🎉
        </div>
        {/* Right */}
        <div className="absolute w-full h-full glass-panel neon-border flex items-center justify-center text-4xl" style={{ transform: 'rotateY(90deg) translateZ(64px)' }}>
          👨‍💻
        </div>
        {/* Left */}
        <div className="absolute w-full h-full glass-panel neon-border flex items-center justify-center text-4xl" style={{ transform: 'rotateY(-90deg) translateZ(64px)' }}>
          🚀
        </div>
        {/* Top */}
        <div className="absolute w-full h-full glass-panel flex items-center justify-center text-4xl" style={{ transform: 'rotateX(90deg) translateZ(64px)' }}>
          🎁
        </div>
        {/* Bottom */}
        <div className="absolute w-full h-full glass-panel flex items-center justify-center text-4xl" style={{ transform: 'rotateX(-90deg) translateZ(64px)' }}>
          ✨
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring" }}
      className="text-center w-full max-w-5xl flex flex-col items-center justify-center mt-8 md:mt-16"
    >
      <EmojiCube />

      <motion.h1 
        className="text-5xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tighter uppercase leading-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="block neon-text-blue mb-4">
          HAPPY BIRTHDAY
        </span>
        <span className="block text-neon-purple neon-text-purple">
          VISHNU MAMA
        </span>
      </motion.h1>

      <motion.div 
        className="mt-8 inline-block px-12 py-5 rounded-lg border-2 border-neon-cyan shadow-[0_0_20px_rgba(8,247,254,0.3)] bg-black/40 backdrop-blur-xl"
        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(8,247,254,0.6)" }}
      >
        <p className="text-xl md:text-2xl lg:text-3xl font-mono text-neon-cyan font-bold tracking-widest uppercase">
          "BUILD V22.0 STABLE VERSION RELEASED FOR DEPLOYMENT"
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-8 text-gray-400 font-mono text-sm max-w-2xl text-center"
      >
        &gt; Compiled with 💖 and React {React.version}. No bugs detected in new age bracket. Ready for deployment.
      </motion.p>
    </motion.div>
  );
};

export default Hero;
