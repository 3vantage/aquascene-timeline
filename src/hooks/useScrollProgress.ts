import { useState, useEffect } from 'react';
import { ScrollProgress } from '../types';

export const useScrollProgress = (): ScrollProgress => {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    scrollY: 0,
    scrollYProgress: 0,
    velocity: 0
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let lastScrollY = 0;
    let lastTime = Date.now();

    const updateScrollProgress = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      const deltaScrollY = currentScrollY - lastScrollY;
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollYProgress = maxScroll > 0 ? currentScrollY / maxScroll : 0;
      const velocity = deltaTime > 0 ? deltaScrollY / deltaTime : 0;

      setScrollProgress({
        scrollY: currentScrollY,
        scrollYProgress: Math.min(Math.max(scrollYProgress, 0), 1),
        velocity
      });

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    const throttledUpdate = () => {
      requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', throttledUpdate, { passive: true });
    
    // Initial call
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
    };
  }, []);

  return scrollProgress;
};

export default useScrollProgress;