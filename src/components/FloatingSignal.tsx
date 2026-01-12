
"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingSignalProps {
  label: string;
  delay?: number;
  onClick?: () => void;
}

export default function FloatingSignal({ label, delay = 0, onClick }: FloatingSignalProps) {
  // Random position generation
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [randomDurations, setRandomDurations] = useState({ x: 10, y: 12 });

  useEffect(() => {
    setPosition({
      x: Math.random() * 80 - 40, // -40% to 40% (80vw width)
      y: Math.random() * 60 - 30,
    });
    setRandomDurations({
      x: 10 + Math.random() * 10,
      y: 12 + Math.random() * 10
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [position.x + 'vw', (position.x + 5) + 'vw', (position.x - 5) + 'vw', position.x + 'vw'],
        y: [position.y + 'vh', (position.y - 5) + 'vh', (position.y + 5) + 'vh', position.y + 'vh']
      }}
      transition={{
        opacity: { delay, duration: 1 },
        scale: { delay, duration: 1 },
        x: { duration: randomDurations.x, repeat: Infinity, ease: "easeInOut" },
        y: { duration: randomDurations.y, repeat: Infinity, ease: "easeInOut" }
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto"
    >
      <button 
        onClick={onClick}
        className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        {label}
      </button>
    </motion.div>
  );
}
