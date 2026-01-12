
"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeadlineCloudProps {
  headlines: string[];
}

export default function HeadlineCloud({ headlines }: HeadlineCloudProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {headlines.map((headline, i) => (
        <HeadlineItem key={i} text={headline} index={i} total={headlines.length} />
      ))}
    </div>
  );
}

function HeadlineItem({ text, index, total }: { text: string; index: number; total: number }) {
  const [coords, setCoords] = useState({ top: 0, left: 0, duration: 15 });

  useEffect(() => {
    setCoords({
      top: (index / total) * 80 + 10,
      left: Math.random() * 60 + 20,
      duration: 15 + Math.random() * 10
    });
  }, [index, total]);

  const delay = index * 0.5;

  return (
    <motion.div
      className="absolute text-2xl md:text-4xl font-bold text-white/10 whitespace-nowrap font-outfit select-none"
      style={{ top: `${coords.top}%`, left: `${coords.left}%` }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: [0, 0.3, 0], 
        x: "-20vw" // drift left responsive
      }}
      transition={{
        duration: coords.duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    >
      {text}
    </motion.div>
  );
}
