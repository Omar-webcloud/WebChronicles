
"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useChronicleStore } from '@/store/chronicleStore';
import { AVAILABLE_DATES, getChronicleData } from '@/lib/api';

// Sort dates descending (Newest first)
const SORTED_DATES = [...AVAILABLE_DATES].sort((a, b) => 
  new Date(b).getTime() - new Date(a).getTime()
);

export default function TimeSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setDate, setMood, setChronicleData, setLoading } = useChronicleStore();
  const [previewDate, setPreviewDate] = useState<string | null>(null);
  
  // Motion values
  const x = useMotionValue(0);
  const width = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      width.current = containerRef.current.offsetWidth - 32; // -32 for handle width
    }
  }, []);

  const handleDrag = () => {
    const currentX = x.get();
    const progress = Math.max(0, Math.min(1, currentX / width.current));
    
    // Map progress to date index
    const index = Math.round(progress * (SORTED_DATES.length - 1));
    const date = SORTED_DATES[index];
    
    if (date !== previewDate) {
      setPreviewDate(date);
      // Haptic feedback
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
      // Optimistically fetch/set mood for "live" feel
      // We can iterate moods without full data fetch if we had a lightweight map.
      // For now, we fetch data rapidly (it's mocked/local so it's fast)
      getChronicleData(date).then(data => {
         setMood(data.mood);
      });
    }
  };

  const handleDragEnd = async () => {
    if (previewDate) {
      setLoading(true);
      setDate(previewDate);
      const data = await getChronicleData(previewDate);
      setChronicleData(data);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-3xl mx-auto px-6 py-8 relative z-20">
      
      {/* Date Display */}
      <div className="text-center mb-8 h-12 flex items-center justify-center">
        <motion.div 
           key={previewDate || "default"}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-3xl font-bold font-outfit"
        >
          {previewDate ? (
             new Date(previewDate === 'today' ? new Date() : previewDate).getFullYear()
          ) : (
            <span className="text-white/50 text-sm font-inter tracking-widest uppercase">Slide to Time Travel</span>
          )}
        </motion.div>
      </div>

      <div className="relative h-12 flex items-center justify-center" ref={containerRef}>
        
        {/* Track */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/20 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-white/50"
               style={{ width: useTransform(x, (val) => `${(val / (width.current || 1)) * 100}%`) }}
             />
        </div>

        {/* Labels */}
        <div className="absolute top-0 left-0 -mt-6 text-xs text-white/40 font-mono">Future</div>
        <div className="absolute top-0 right-0 -mt-6 text-xs text-white/40 font-mono">Past</div>

        {/* Handle */}
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="absolute left-0 top-1/2 -mt-4 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] cursor-grab active:cursor-grabbing flex items-center justify-center"
        >
            <div className="w-2 h-2 bg-black/50 rounded-full" />
        </motion.div>
      </div>

      <div className="mt-4 text-center text-xs text-white/30 font-mono">
         {previewDate ? previewDate.toUpperCase() : "DRAG SLIDER"}
      </div>
    </div>
  );
}
