import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, GitBranch } from 'lucide-react';

const photos = [
  "mem_1.png", "mem_2.png", "mem_3.png", "mem_4.png", "mem_5.png",
  "mem_6.jpeg", "mem_7.jpeg", "mem_8.jpeg", "mem_9.jpeg", "mem_10.jpeg",
  "mem_11.jpeg", "mem_12.jpeg", "mem_13.jpeg", "mem_14.jpeg", "mem_15.jpeg",
  "mem_16.jpeg", "mem_17.jpeg", "mem_18.jpeg", "mem_19.jpeg", "mem_20.jpeg",
  "mem_21.jpeg", "mem_22.jpeg", "mem_23.jpeg", "mem_24.jpeg", "mem_25.jpeg"
];

const icons = [GitCommit, GitMerge, GitPullRequest, GitBranch];
const borderColors = ["border-neon-cyan", "border-neon-purple", "border-neon-pink", "border-neon-green"];
const shadowColors = ["shadow-[0_0_20px_#08f7fe]", "shadow-[0_0_20px_#b026ff]", "shadow-[0_0_20px_#ff007f]", "shadow-[0_0_20px_#09fbd3]"];

const branchBackgrounds = ["bg-neon-cyan", "bg-neon-purple", "bg-neon-pink", "bg-neon-green"];
const tagStyles = [
  "text-neon-cyan border-neon-cyan",
  "text-neon-purple border-neon-purple",
  "text-neon-pink border-neon-pink",
  "text-neon-green border-neon-green"
];

const messages = [
  "Legendary memory deployed",
  "Epic bug fixed, friendship strengthened",
  "Database overflowed with good times",
  "Merged branch without conflicts",
  "Crazy moments compiled successfully",
  "Infinite loop of laughter detected",
  "Null pointer avoided, great save",
  "Server uptime: Forever",
  "Commit message: Unforgettable day"
];

const memories = photos.map((photo, i) => ({
  id: Math.random().toString(16).substring(2, 8),
  message: messages[i % messages.length],
  photo: `/photos/${photo}`,
  icon: icons[i % icons.length],
  borderColor: borderColors[i % borderColors.length],
  shadowColor: shadowColors[i % shadowColors.length],
  branchBg: branchBackgrounds[i % branchBackgrounds.length],
  tagStyle: tagStyles[i % tagStyles.length]
}));

const CardContent = ({ memory }) => {
  return (
    <div className={`glass-panel rounded-2xl p-4 md:p-6 relative overflow-hidden group w-full border-2 ${memory.borderColor} hover:${memory.shadowColor} transition-all duration-300`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${memory.branchBg} opacity-50`} />
      
      <div className="flex items-center gap-3 mb-4">
        <span className={`font-mono text-xs px-2 py-1 bg-black/50 rounded border ${memory.tagStyle}`}>
          commit {memory.id}
        </span>
      </div>

      <div className={`w-full relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border-2 ${memory.borderColor} opacity-90 group-hover:opacity-100 transition-opacity duration-500 mb-4 bg-black/50`}>
        <img 
          src={memory.photo} 
          alt="Memory branch" 
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className={`absolute inset-0 ${memory.branchBg} opacity-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none`} />
      </div>

      <h3 className={`text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-mono truncate`}>
        &gt; {memory.message}
      </h3>
    </div>
  );
};

const MemoryTimeline = () => {
  return (
    <div className="w-full py-12 px-4 md:px-0 mb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-20 justify-center text-center"
      >
        <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase neon-text-purple">
          Commit History
        </h2>
      </motion.div>

      {/* Bus Topology Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* The Central Bus Line */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 md:w-2 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink shadow-[0_0_15px_#b026ff] md:-ml-[4px] rounded-full z-0" />

        <div className="flex flex-col space-y-16 md:space-y-24">
          {memories.map((memory, index) => {
            const Icon = memory.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={memory.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                className="relative w-full"
              >
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between w-full">
                  {/* Left Side (Even items get the card here) */}
                  <div className="w-[45%] flex justify-end relative">
                    {isEven && (
                      <>
                        <CardContent memory={memory} />
                        {/* Horizontal Branch connecting to center bus */}
                        <div className={`absolute -right-[11%] top-1/2 -translate-y-1/2 w-[11%] h-1 ${memory.branchBg} shadow-[0_0_10px_currentColor] z-0`} />
                      </>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className={`w-12 h-12 shrink-0 z-10 bg-black rounded-full border-4 ${memory.borderColor} flex items-center justify-center text-white ${memory.shadowColor} hover:scale-125 transition-transform duration-300`}>
                    <Icon size={20} />
                  </div>

                  {/* Right Side (Odd items get the card here) */}
                  <div className="w-[45%] flex justify-start relative">
                    {!isEven && (
                      <>
                        {/* Horizontal Branch connecting to center bus */}
                        <div className={`absolute -left-[11%] top-1/2 -translate-y-1/2 w-[11%] h-1 ${memory.branchBg} shadow-[0_0_10px_currentColor] z-0`} />
                        <CardContent memory={memory} />
                      </>
                    )}
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="flex md:hidden relative w-full items-center pl-16">
                  {/* Center Node (Pushed to the left edge) */}
                  <div className={`absolute left-[16px] top-1/2 -translate-y-1/2 w-8 h-8 shrink-0 z-10 bg-black rounded-full border-4 ${memory.borderColor} flex items-center justify-center text-white shadow-[0_0_10px_currentColor]`}>
                    <Icon size={14} />
                  </div>

                  {/* Horizontal Branch (Connects node to card) */}
                  <div className={`absolute left-[40px] top-1/2 -translate-y-1/2 w-[24px] h-1 ${memory.branchBg} shadow-[0_0_8px_currentColor] z-0`} />

                  {/* Full Width Card on Mobile */}
                  <div className="w-full">
                    <CardContent memory={memory} />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MemoryTimeline;
