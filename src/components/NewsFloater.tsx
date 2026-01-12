"use client";

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ChronicleData } from '@/lib/api';

interface NewsFloaterProps {
  data: ChronicleData['highlightedNews'];
}

export default function NewsFloater({ data }: NewsFloaterProps) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: -20 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed bottom-32 right-8 z-30 pointer-events-auto"
    >
      <a 
        href={data.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-xs shadow-2xl transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          {/* Label */}
          <div className="flex items-center gap-2 mb-2 text-white/60 text-xs font-mono uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Breaking News
          </div>

          {/* Title */}
          <h3 className="text-white font-bold leading-tight mb-3 line-clamp-3">
            {data.title}
          </h3>

          {/* Source & Icon */}
          <div className="flex items-center justify-between text-white/50 text-xs border-t border-white/10 pt-3">
             <span className="uppercase tracking-wide font-medium">{data.source}</span>
             <ExternalLink className="w-3 h-3 group-hover:text-white transition-colors" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}
