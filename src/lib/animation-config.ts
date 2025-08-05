/**
 * Animation Configuration for 3vantage Aquascaping SPA
 * Optimized for performance with accessibility and reduced motion support
 */

export interface AnimationConfig {
  duration: number;
  ease: string | number[];
  enabled: boolean;
  particleCount?: number;
  complexAnimationsEnabled?: boolean;
}

export type PerformanceMode = 'full' | 'reduced' | 'minimal';

/**
 * Animation Manager - Handles performance optimization and accessibility
 */
export class AnimationManager {
  private static instance: AnimationManager;
  private performanceMode: PerformanceMode = 'full';
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.detectPerformanceMode();
      this.setupReducedMotionListener();
    }
  }
  
  static getInstance(): AnimationManager {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }
  
  private detectPerformanceMode(): void {
    // Check for reduced motion preference
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (hasReducedMotion) {
      this.performanceMode = 'minimal';
      return;
    }
    
    // Check device capabilities
    const isLowEndDevice = this.isLowEndDevice();
    const isSlowConnection = this.isSlowConnection();
    
    if (isLowEndDevice || isSlowConnection) {
      this.performanceMode = 'reduced';
    } else {
      this.performanceMode = 'full';
    }
  }
  
  private isLowEndDevice(): boolean {
    // Check hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
      return true;
    }
    
    // Check device memory
    if ('deviceMemory' in navigator && (navigator as any).deviceMemory <= 4) {
      return true;
    }
    
    return false;
  }
  
  private isSlowConnection(): boolean {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
    }
    return false;
  }
  
  private setupReducedMotionListener(): void {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', () => {
      this.detectPerformanceMode();
    });
  }
  
  getAnimationConfig(animationType: string = 'default'): AnimationConfig {
    const configs: Record<PerformanceMode, AnimationConfig> = {
      full: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        enabled: true,
        particleCount: 15,
        complexAnimationsEnabled: true
      },
      reduced: {
        duration: 0.3,
        ease: 'linear',
        enabled: true,
        particleCount: 5,
        complexAnimationsEnabled: false
      },
      minimal: {
        duration: 0.01,
        ease: 'linear',
        enabled: false,
        particleCount: 0,
        complexAnimationsEnabled: false
      }
    };
    
    return configs[this.performanceMode];
  }
  
  getPerformanceMode(): PerformanceMode {
    return this.performanceMode;
  }
}

// Animation variants for common UI elements
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

// Stagger animation for lists
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

// Aquascaping-specific animations
export const bubbleFloat = {
  initial: { 
    y: '100vh', 
    x: 0,
    scale: 0,
    opacity: 0
  },
  animate: { 
    y: '-10vh',
    x: [0, 20, -10, 15, 0],
    scale: [0, 1, 1, 0.8, 0],
    opacity: [0, 0.7, 0.7, 0.5, 0],
    rotate: [0, 10, -5, 15, 0]
  }
};

export const fishSwim = {
  initial: { x: '-100px', y: 0 },
  animate: {
    x: '100vw',
    y: [0, -20, 20, -10, 0],
    rotate: [0, -5, 5, -2, 0]
  }
};

export const plantSway = {
  animate: {
    rotate: [0, 2, 0, -2, 0],
    skewX: [0, 1, 0, -1, 0]
  }
};

export const waterRipple = {
  initial: { scale: 0, opacity: 0.8 },
  animate: { 
    scale: 4, 
    opacity: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

// Button animations
export const buttonHover = {
  scale: 1.02,
  y: -2,
  boxShadow: '0 8px 25px rgba(45, 90, 61, 0.4)',
  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
};

export const buttonTap = {
  scale: 0.98,
  y: 0,
  boxShadow: '0 2px 10px rgba(45, 90, 61, 0.3)'
};

// Form field animations
export const fieldFocus = {
  scale: 1.02,
  transition: { duration: 0.2, ease: 'easeOut' }
};

export const fieldError = {
  x: [-10, 10, -10, 10, 0],
  transition: { duration: 0.4 }
};

// Loading animations
export const spinAnimation = {
  rotate: 360,
  transition: { 
    duration: 1, 
    repeat: Infinity, 
    ease: 'linear' 
  }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 1, 0.7],
  transition: { 
    duration: 2, 
    repeat: Infinity, 
    ease: 'easeInOut' 
  }
};

// Success animation variants
export const successCheckmark = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: 'easeInOut' 
    }
  }
};

export const successContainer = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
};

export default AnimationManager;