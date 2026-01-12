"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { ChronicleData } from '@/lib/api';

interface NewsFloaterProps {
  data: ChronicleData['highlightedNews'];
}

export default function NewsFloater({ data }: NewsFloaterProps) {
  const [randomDurations, setRandomDurations] = useState({ x: 15, y: 18 });

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setRandomDurations({
        x: 15 + Math.random() * 10,
        y: 18 + Math.random() * 10
      });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!data) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto md:top-auto md:left-auto md:bottom-32 md:right-8 md:translate-x-0 md:translate-y-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: [0, 20, 0, -20, 0],
          y: [0, -20, 0, 20, 0]
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 },
          x: { duration: randomDurations.x, repeat: Infinity, ease: "easeInOut" },
          y: { duration: randomDurations.y, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <a 
          href={data.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-2xl max-w-xs shadow-2xl transition-all duration-300 hover:bg-black/40 hover:scale-105 hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-2 mb-2 text-white/60 text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Breaking News
            </div>

            <h3 className="text-white font-bold leading-tight mb-3 line-clamp-3">
              {data.title}
            </h3>

            <div className="flex items-center justify-between text-white/50 text-xs border-t border-white/10 pt-3">
               <span className="uppercase tracking-wide font-medium">{data.source}</span>
               <ExternalLink className="w-3 h-3 group-hover:text-white transition-colors" />
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}
