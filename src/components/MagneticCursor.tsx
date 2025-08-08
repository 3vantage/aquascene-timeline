import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { CursorPosition } from '../types';

interface MagneticCursorProps {
  position: CursorPosition;
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({ position }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState<string>('');

  // Spring animations for smooth cursor movement
  const cursorX = useSpring(0, { stiffness: 500, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 30 });
  const dotX = useSpring(0, { stiffness: 800, damping: 25 });
  const dotY = useSpring(0, { stiffness: 800, damping: 25 });

  useEffect(() => {
    cursorX.set(position.x - 15);
    cursorY.set(position.y - 15);
    dotX.set(position.x - 4);
    dotY.set(position.y - 4);
  }, [position, cursorX, cursorY, dotX, dotY]);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
      const handleMouseEnter = () => {
        setIsHovering(true);
        const text = element.getAttribute('data-cursor-text');
        if (text) setCursorText(text);
        
        // Magnetic attraction effect
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const attract = (e: MouseEvent) => {
          const deltaX = (centerX - e.clientX) * 0.2;
          const deltaY = (centerY - e.clientY) * 0.2;
          
          gsap.to(element, {
            x: -deltaX,
            y: -deltaY,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        document.addEventListener('mousemove', attract);
        element.setAttribute('data-attract-listener', 'true');
      };

      const handleMouseLeave = () => {
        setIsHovering(false);
        setCursorText('');
        
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });

        // Remove attract listener
        const listeners = document.querySelectorAll('[data-attract-listener]');
        listeners.forEach(el => {
          el.removeAttribute('data-attract-listener');
        });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      magneticElements.forEach(element => {
        element.removeEventListener('mouseenter', () => {});
        element.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 2 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.6 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full rounded-full border-2 border-white bg-white/10 backdrop-blur-sm">
          {/* Cursor particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-aqua-300 rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * Math.PI/2) * 15, 0],
                y: [0, Math.sin(i * Math.PI/2) * 15, 0],
                opacity: [0.6, 0.2, 0.6],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Cursor text */}
          {cursorText && (
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {cursorText}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10000]"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isClicking ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="w-full h-full rounded-full bg-white mix-blend-difference" />
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: position.x - 25,
            top: position.y - 25,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-aqua-300" />
        </motion.div>
      )}

      {/* Trailing particles */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-aqua-200 rounded-full"
            animate={{
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
              opacity: [0.6, 0, 0.6],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </motion.div>
    </>
  );
};

export default MagneticCursor;