
"use client";

import { motion, PanInfo } from 'framer-motion';
import { X, TrendingUp, MessageCircle, Share2, BarChart2 } from 'lucide-react';

interface FocusCardProps {
  topic: string;
  onClose: () => void;
}

export default function FocusCard({ topic, onClose }: FocusCardProps) {

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={handleDragEnd}
        className="w-full max-w-md bg-gray-900 border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 relative z-10 shadow-2xl h-[85vh] sm:h-auto sm:max-h-[80vh] overflow-y-auto"
      >

        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />

        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold font-outfit bg-clip-text text-transparent bg-linear-to-r from-white to-white/50">{topic}</h2>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>


        <div className="space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-white/50 mb-2 text-xs uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" />
                    <span>Impact</span>
                </div>
                <div className="text-2xl font-bold">High</div>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-white/50 mb-2 text-xs uppercase tracking-wider">
                    <MessageCircle className="w-4 h-4" />
                    <span>Mentions</span>
                </div>
                <div className="text-2xl font-bold">2.4M</div>
             </div>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
             <h3 className="text-sm text-white/50 uppercase tracking-widest mb-4">Sentiment Analysis</h3>
             <div className="h-32 flex items-end justify-between gap-2">
                {[40, 60, 30, 80, 50, 90, 70, 45].map((h, i) => (
                    <div key={i} className="w-full bg-white/20 rounded-t-sm hover:bg-white/40 transition-colors relative group">
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 bg-blue-500/80 group-hover:bg-blue-400"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.2 + (i * 0.05), duration: 0.5 }}
                        />
                    </div>
                ))}
             </div>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
             <h3 className="text-sm text-white/50 uppercase tracking-widest mb-4">Context</h3>
             <p className="text-white/80 leading-relaxed font-light">
               This topic dominated online discourse for 48 hours. 
               The sentiment shifted rapidly from confusion to outrage, 
               generating millions of interactions across major platforms.
             </p>
          </div>

           <div className="flex gap-4 pt-4">
              <button className="flex-1 py-3 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                 <BarChart2 className="w-4 h-4" />
                 Explore Data
              </button>
              <button className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                 <Share2 className="w-4 h-4" />
                 Share
              </button>
           </div>

        </div>

      </motion.div>
    </motion.div>
  );
}
