
"use client";

import { motion } from 'framer-motion';
import { useChronicleStore } from '@/store/chronicleStore';
import { getMoodGradient } from '@/lib/moodMapper';

export default function MoodBackground() {
  const currentMood = useChronicleStore((state) => state.currentMood);
  const selectedDate = useChronicleStore((state) => state.selectedDate);

  let gradient = '';
  let showNoise = false;

  if (!selectedDate || selectedDate === 'today') {
    gradient = getMoodGradient(currentMood);
    showNoise = false;
  } else {
    const year = new Date(selectedDate).getFullYear();
    switch (year) {
      case 2005:

        gradient = 'linear-gradient(to bottom right, #2563eb, #f97316)'; 
        showNoise = true;
        break;
      case 2022:

        gradient = 'linear-gradient(to bottom right, #4c1d95, #0ea5e9, #f472b6)';
        showNoise = false;
        break;
      case 2026:

        gradient = 'linear-gradient(to bottom right, #059669, #0d9488, #2dd4bf)';
        showNoise = false;
        break;
      case 2016:

        gradient = 'linear-gradient(to bottom right, #dc2626, #2563eb, #1e3a8a)';
        showNoise = false;
        break;
      case 2020:

        gradient = 'linear-gradient(to bottom right, #1f2937, #7f1d1d, #000000)';
        showNoise = false;
        break;
      case 2009:

        gradient = 'linear-gradient(to bottom right, #fbbf24, #374151, #000000)';
        showNoise = false;
        break;
      default:
        gradient = getMoodGradient(currentMood);
        showNoise = false;
    }
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-0 transition-all duration-2000"
        style={{ background: gradient }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      

      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-noise"
        initial={{ opacity: 0 }}
        animate={{ opacity: showNoise ? 0.15 : 0 }}
        transition={{ duration: 1 }}
      />

      <div className="fixed inset-0 bg-black/30 z-0 pointer-events-none" />
    </>
  );
}
