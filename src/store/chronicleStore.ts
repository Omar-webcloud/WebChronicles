
import { create } from 'zustand';
import { ChronicleData, Mood } from '@/lib/api';

interface ChronicleState {
  selectedDate: string | null;
  isDragging: boolean;
  currentMood: Mood;
  chronicleData: ChronicleData | null;
  isLoading: boolean;
  
  // Actions
  setDate: (date: string | null) => void;
  setDragging: (isDragging: boolean) => void;
  setMood: (mood: Mood) => void;
  setChronicleData: (data: ChronicleData | null) => void;
  setLoading: (loading: boolean) => void;
}

const DEFAULT_MOOD: Mood = {
  positivity: 0,
  chaos: 0.1,
  intensity: 0.2
};

export const useChronicleStore = create<ChronicleState>((set) => ({
  selectedDate: null,
  isDragging: false,
  currentMood: DEFAULT_MOOD,
  chronicleData: null,
  isLoading: false,

  setDate: (date) => set({ selectedDate: date }),
  setDragging: (isDragging) => set({ isDragging }),
  setMood: (mood) => set({ currentMood: mood }),
  setChronicleData: (data) => set({ chronicleData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
