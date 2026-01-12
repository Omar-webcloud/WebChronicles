
import { Mood } from './api';

export function getMoodGradient(mood: Mood): string {
  const { positivity, intensity, chaos } = mood;
  
  // Positivity maps to hue:
  // -1 (negative) -> Red/Dark Purple
  // 0 (neutral) -> Grey/Blue
  // 1 (positive) -> Gold/Orange/Cyan

  // Intensity maps to saturation/lightness kicks
  // Chaos maps to complexity of gradient (more stops)

  let baseHue = 220; // Default Blue
  if (positivity < -0.5) baseHue = 0; // Red
  else if (positivity < 0) baseHue = 260; // Purple
  else if (positivity > 0.5) baseHue = 45; // Gold
  else if (positivity > 0) baseHue = 180; // Cyan

  const saturation = 50 + (intensity * 50);
  const lightness = 10 + (intensity * 40); // Darker base usually looking premium

  const color1 = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
  const color2 = `hsl(${baseHue + 40}, ${saturation}%, ${lightness - 10}%)`;
  const color3 = `hsl(${baseHue - 40}, ${saturation}%, ${lightness + 5}%)`;

  if (chaos > 0.7) {
     return `radial-gradient(circle at 50% 50%, ${color1}, ${color2}, #000)`;
  }
  
  return `linear-gradient(${45 + (chaos * 360)}deg, ${color1}, ${color2}, ${color3})`;
}

export function getMoodTextColor(mood: Mood): string {
    // Usually white or off-white for premium dark mode, 
    // but maybe glow color changes
    return '#ffffff';
}

export function getChaosAnimationDuration(chaos: number): number {
    // Higher chaos -> faster animation (lower duration)
    // 0 -> 20s
    // 1 -> 2s
    return 20 - (chaos * 18);
}

export function getBlurAmount(intensity: number): string {
    // Lower intensity -> more blur/fog
    // Higher intensity -> sharper
    return `${10 + ((1-intensity) * 60)}px`;
}
