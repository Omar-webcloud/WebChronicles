
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChronicleStore } from '@/store/chronicleStore';
import MoodBackground from '@/components/MoodBackground';
import TimeSlider from '@/components/TimeSlider';
import FloatingSignal from '@/components/FloatingSignal';
import HeadlineCloud from '@/components/HeadlineCloud';
import FocusCard from '@/components/FocusCard';
import NewsFloater from '@/components/NewsFloater';


export default function Home() {
  const { selectedDate, chronicleData, isLoading } = useChronicleStore();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    // Maybe set initial mood or date?
    // PRD says Entry: "What did the internet feel like today?"
  }, []);



  return (
    <main className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-between text-white selection:bg-white/20">
      <MoodBackground />

      <AnimatePresence mode="wait">
        
        {/* Landing View / Header */}
        {!selectedDate && (
          <motion.div 
             key="landing-header"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
             className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 text-center"
          >
             <motion.h1 
               className="text-4xl sm:text-6xl font-black tracking-tight mb-4 font-outfit"
               animate={{ textShadow: ["0 0 20px rgba(255,255,255,0.2)", "0 0 40px rgba(255,255,255,0.4)", "0 0 20px rgba(255,255,255,0.2)"] }}
               transition={{ duration: 3, repeat: Infinity }}
             >
               WebChronicles
             </motion.h1>
             <p className="text-xl sm:text-2xl font-light text-white/80 max-w-md mx-auto">
               What did the internet feel like today?
             </p>
             
             {/* Hints */}
             <div className="mt-12 opacity-50 text-sm font-mono tracking-widest flex gap-8">
               <span>FEAR</span>
               <span>HOPE</span>
               <span>MEMES</span>
             </div>
          </motion.div>
        )}

        {/* Chronicle View Content */}
        {selectedDate && chronicleData && !isLoading && (
          <motion.div
             key="chronicle-content"
             className="absolute inset-0 z-0 pointer-events-none"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1 }}
          >
             {/* Headlines in background */}
             <HeadlineCloud headlines={chronicleData.headlines} />

             {/* Signals floating */}
             <div className="absolute inset-0 z-10 pointer-events-none">
                {chronicleData.signals.map((signal, i) => (
                   <FloatingSignal 
                      key={signal} 
                      label={signal} 
                      delay={i * 0.2} 
                      onClick={() => setSelectedTopic(signal)}
                   />
                ))}
             </div>
             
             {/* Description Text */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1, duration: 1 }}
               className="absolute bottom-32 left-0 w-full px-8 text-center pointer-events-none"
             >
                <p className="text-lg font-light text-shadow-sm max-w-lg mx-auto leading-relaxed">
                  {chronicleData.description}
                </p>
             </motion.div>

             {/* Back Button */}


             {/* Highlighted News Floater */}
             {chronicleData.highlightedNews && (
                 <NewsFloater data={chronicleData.highlightedNews} />
             )}

          </motion.div>
        )}
      
      </AnimatePresence>

      {/* Loading State */}
      {selectedDate && isLoading && (
         <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-sm">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="w-12 h-12 border-t-2 border-white rounded-full"
             />
         </div>
      )}

      {/* Bottom Slider Area */}
      <div className="w-full relative z-20 pb-8 pt-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
         <TimeSlider />
      </div>

      {/* Focus Card Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <FocusCard 
            topic={selectedTopic} 
            onClose={() => setSelectedTopic(null)} 
          />
        )}
      </AnimatePresence>

    </main>
  );
}
