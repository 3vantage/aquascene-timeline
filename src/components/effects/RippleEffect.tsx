import React from 'react';
import { motion } from 'framer-motion';

interface RippleEffectProps {
  x: number;
  y: number;
  color: string;
}

const RippleEffect: React.FC<RippleEffectProps> = ({ x, y, color }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x - 25,
        top: y - 25,
      }}
    >
      {/* Primary ripple */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color }}
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Secondary ripple */}
      <motion.div
        className="absolute inset-2 rounded-full border"
        style={{ borderColor: color }}
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      />

      {/* Particle burst */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 30;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: color,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0.8, 
              scale: 1 
            }}
            animate={{ 
              x: endX, 
              y: endY, 
              opacity: 0, 
              scale: 0.5 
            }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.05,
              ease: "easeOut" 
            }}
          />
        );
      })}

      {/* Central flash */}
      <motion.div
        className="absolute inset-4 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scale: 0.5, opacity: 0.9 }}
        animate={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};

export default RippleEffect;