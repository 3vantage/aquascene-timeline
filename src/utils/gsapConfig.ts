import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP default settings
gsap.defaults({
  ease: "power2.out",
  duration: 0.8,
});

// Common GSAP animations
export const animations = {
  fadeInUp: {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  },
  
  staggerFadeInUp: {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 }
  },
  
  scaleIn: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
  },
  
  slideInFromLeft: {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  },
  
  slideInFromRight: {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  }
};

// Scroll trigger configurations
export const scrollTriggerConfigs = {
  default: {
    trigger: null, // Will be set dynamically
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  },
  
  parallax: {
    trigger: null,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
  
  pin: {
    trigger: null,
    start: "top top",
    end: "bottom top",
    pin: true,
    pinSpacing: false,
  }
};

// Helper function to create scroll triggered animations
export const createScrollAnimation = (
  elements: string | Element | Element[],
  animation: typeof animations[keyof typeof animations],
  config: Partial<typeof scrollTriggerConfigs.default> = {}
) => {
  const finalConfig = { ...scrollTriggerConfigs.default, ...config };
  
  return gsap.fromTo(
    elements,
    animation.from,
    {
      ...animation.to,
      scrollTrigger: {
        ...finalConfig,
        trigger: finalConfig.trigger || elements
      }
    }
  );
};

export default gsap;