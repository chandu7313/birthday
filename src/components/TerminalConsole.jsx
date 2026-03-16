import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

const TerminalConsole = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Connection established. Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const commands = {
    help: () => 'AVAILABLE COMMANDS: help, memories, cake, gift, surprise, clear',
    memories: () => `Loading memories...\n\n2018 → First legendary conversation\n2019 → Created crazy moments\n2021 → Survived exams together\n2026 → Birthday build deployed 🎉`,
    cake: () => '🎂 🎂 🎂 Have some virtual cake! (Look around!)',
    gift: () => '🎁 A futuristic gift box has been airdropped to your location.',
    surprise: () => {
      triggerConfetti();
      return 'BOOM! 🎉 Initiating surprise sequence...';
    },
    'sudo celebrate': () => {
      triggerMassiveConfetti();
      return 'ACCESS GRANTED. Overriding safety protocols... MAX CELEBRATION DEPLOYED.';
    },
    clear: () => {
      setHistory([]);
      return null;
    }
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  };

  const triggerMassiveConfetti = () => {
    const end = Date.now() + 3000;
    const colors = ['#b026ff', '#08f7fe', '#ff007f'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', content: `> ${input}` }];
    
    if (commands[cmd]) {
      const output = commands[cmd]();
      if (output !== null) {
        newHistory.push({ type: 'output', content: output });
      }
    } else {
      newHistory.push({ type: 'error', content: `Command not found: ${cmd}. Type "help" for commands.` });
    }

    setHistory(cmd === 'clear' ? [] : newHistory);
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full glass-panel neon-border-purple rounded-xl overflow-hidden font-mono text-sm md:text-base shadow-2xl"
    >
      {/* Terminal Header */}
      <div className="bg-black/80 px-4 py-3 flex flex-row items-center border-b border-neon-purple/30">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex text-neon-cyan items-center gap-2 mx-auto uppercase tracking-widest text-xs font-orbitron">
          <Terminal size={14} /> dev_console v23.0.1
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-6 h-80 overflow-y-auto terminal-scroll bg-black/60 text-gray-300">
        <div className="flex flex-col gap-2">
          {history.map((record, idx) => (
            <div 
              key={idx} 
              className={`whitespace-pre-wrap ${
                record.type === 'system' ? 'text-neon-green' : 
                record.type === 'error' ? 'text-red-400' :
                record.type === 'input' ? 'text-neon-cyan' : 'text-neon-pink'
              }`}
            >
              {record.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="mt-4 flex items-center">
          <span className="text-neon-cyan mr-2 animate-pulse">&gt;</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder-gray-600"
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
    </motion.div>
  );
};

export default TerminalConsole;
