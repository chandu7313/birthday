import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootSequence from './components/BootSequence';
import TerminalConsole from './components/TerminalConsole';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import MemoryTimeline from './components/MemoryTimeline';
import SurpriseButton from './components/SurpriseButton';
import FloatingImages from './components/FloatingImages';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX } from 'lucide-react';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Audio setup
  useEffect(() => {
    // Attempt to play synthwave bg audio if not muted. 
    // Please place 'synthwave-bg.mp3' in your public folder.
    const audio = new Audio('/synthwave-bg.mp3');
    audio.loop = true;
    if (!isMuted) {
      audio.play().catch(e => console.log("Audio play failed (maybe no file yet or interaction needed)", e));
    }
    return () => audio.pause();
  }, [isMuted]);

  const handleBootComplete = () => {
    setIsBooting(false);
    
    // Trigger initial confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#b026ff', '#00ffff', '#ff007f']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#b026ff', '#00ffff', '#ff007f']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      setShowContent(true);
      setIsMuted(false); // Unmute on start
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full bg-neon-dark text-white overflow-hidden font-orbitron">
      <AnimatePresence>
        {isBooting && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 w-full min-h-screen"
          >
            {/* Background 3D Particles */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <ParticleBackground />
            </div>

            {/* Audio Toggle */}
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="fixed top-6 right-6 z-50 p-3 rounded-full glass-panel neon-border hover:scale-110 transition-transform group"
            >
              {isMuted ? 
                <VolumeX className="text-neon-pink group-hover:text-white" size={24} /> : 
                <Volume2 className="text-neon-blue group-hover:text-white" size={24} />
              }
            </button>

            {/* Foreground Content */}
            <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
              <Hero />
              
              <div className="w-full max-w-4xl mt-16 mb-24">
                <TerminalConsole />
              </div>

              <div className="w-full max-w-4xl mt-12">
                <MemoryTimeline />
              </div>

              <div className="mt-32 mb-20">
                <SurpriseButton />
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <FloatingImages />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
