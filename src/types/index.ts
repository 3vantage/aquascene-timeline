export interface TimelineStage {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  details: {
    temperature: string;
    ph: string;
    species: string[];
    characteristics: string[];
  };
  animation: {
    type: 'liquid' | 'bubble' | 'plant' | 'fish' | 'ecosystem';
    duration: number;
    delay: number;
  };
}

export interface ParticleConfig {
  count: number;
  size: { min: number; max: number };
  speed: { min: number; max: number };
  color: string;
  opacity: { min: number; max: number };
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  stagger?: number;
}

export interface ScrollProgress {
  scrollY: number;
  scrollYProgress: number;
  velocity: number;
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface InteractionState {
  isHovering: boolean;
  isDragging: boolean;
  rippleActive: boolean;
  glowIntensity: number;
}