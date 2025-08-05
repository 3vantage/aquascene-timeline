'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationManager, bubbleFloat } from '@/lib/animation-config';

interface Bubble {
  id: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

interface BubbleSystemProps {
  maxBubbles?: number;
  className?: string;
}

const BubbleSystem: React.FC<BubbleSystemProps> = ({ 
  maxBubbles = 15, 
  className = '' 
}) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const animationManager = AnimationManager.getInstance();
  const config = animationManager.getAnimationConfig();

  const generateBubble = useCallback((index: number): Bubble => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    return {
      id: `bubble-${Date.now()}-${index}`,
      x: Math.random() * screenWidth,
      y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.3,
      delay: Math.random() * 2
    };
  }, []);

  const generateBubbles = useCallback(() => {
    if (!config.enabled) return;
    
    const bubbleCount = Math.min(maxBubbles, config.particleCount || 5);
    const newBubbles: Bubble[] = Array.from({ length: bubbleCount }, (_, i) => 
      generateBubble(i)
    );
    
    setBubbles(newBubbles);
  }, [generateBubble, maxBubbles, config.enabled, config.particleCount]);

  useEffect(() => {
    // Check if animations should be disabled
    if (!config.enabled) {
      setIsVisible(false);
      return;
    }

    generateBubbles();
    
    const interval = setInterval(() => {
      generateBubbles();
    }, 8000); // Generate new bubbles every 8 seconds

    return () => clearInterval(interval);
  }, [generateBubbles, config.enabled]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (config.enabled) {
        generateBubbles();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateBubbles, config.enabled]);

  if (!isVisible || !config.enabled) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute bubble-element"
            initial={bubbleFloat.initial}
            animate={{
              ...bubbleFloat.animate,
              x: [
                bubble.x, 
                bubble.x + 30, 
                bubble.x - 15, 
                bubble.x + 20, 
                bubble.x
              ]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: bubble.speed * 4,
              ease: 'linear',
              delay: bubble.delay,
              repeat: 0
            }}
            style={{
              left: bubble.x,
              width: bubble.size,
              height: bubble.size,
              opacity: bubble.opacity
            }}
          >
            <div 
              className="w-full h-full rounded-full bubble-gradient"
              style={{
                background: `radial-gradient(
                  circle at 30% 30%,
                  rgba(255, 255, 255, 0.8),
                  rgba(135, 206, 235, 0.4),
                  rgba(30, 58, 95, 0.2)
                )`,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(2px)',
                boxShadow: `
                  inset 0 0 10px rgba(255, 255, 255, 0.3),
                  0 4px 8px rgba(0, 0, 0, 0.1)
                `
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BubbleSystem;