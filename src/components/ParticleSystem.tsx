import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
  color: string;
  type: 'bubble' | 'dust' | 'sparkle';
}

const ParticleSystem: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Generate initial particles
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = window.innerWidth < 768 ? 30 : 50; // Fewer particles on mobile

      for (let i = 0; i < particleCount; i++) {
        const particleTypes: Particle['type'][] = ['bubble', 'dust', 'sparkle'];
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        
        let color;
        switch (type) {
          case 'bubble':
            color = 'rgba(56, 189, 248, 0.6)';
            break;
          case 'dust':
            color = 'rgba(255, 255, 255, 0.3)';
            break;
          case 'sparkle':
            color = 'rgba(34, 197, 94, 0.7)';
            break;
        }

        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 2 + 0.5,
          direction: Math.random() * Math.PI * 2,
          color,
          type
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    // Animate particles
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + Math.cos(particle.direction) * particle.speed;
          let newY = particle.y + Math.sin(particle.direction) * particle.speed;

          // Wrap around screen edges
          if (newX < -10) newX = window.innerWidth + 10;
          if (newX > window.innerWidth + 10) newX = -10;
          if (newY < -10) newY = window.innerHeight + 10;
          if (newY > window.innerHeight + 10) newY = -10;

          // Slight direction change for organic movement
          const newDirection = particle.direction + (Math.random() - 0.5) * 0.1;

          return {
            ...particle,
            x: newX,
            y: newY,
            direction: newDirection
          };
        })
      );

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Handle resize
    const handleResize = () => {
      generateParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        >
          {/* Special effects for different particle types */}
          {particle.type === 'bubble' && (
            <div 
              className="absolute top-0.5 left-0.5 w-1/3 h-1/3 bg-white/40 rounded-full"
            />
          )}
          
          {particle.type === 'sparkle' && (
            <>
              <div className="absolute inset-0 rounded-full animate-pulse bg-green-300/50" />
              <motion.div
                className="absolute -inset-1 rounded-full border border-green-200/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </>
          )}

          {particle.type === 'dust' && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: `conic-gradient(from 0deg, transparent, ${particle.color}, transparent)`
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Floating organic shapes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`organic-${i}`}
          className="absolute opacity-10"
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + Math.random() * 80}%`,
            width: `${50 + Math.random() * 100}px`,
            height: `${30 + Math.random() * 60}px`,
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(14, 165, 233, 0.1))',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 180, 360],
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '60% 40% 30% 70% / 60% 30% 70% 40%'
            ]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}

      {/* Light rays */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-0 opacity-5"
          style={{
            left: `${30 + i * 20}%`,
            width: '1px',
            height: '100vh',
            background: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.5), transparent)',
            transform: `rotate(${-5 + i * 2}deg)`,
            transformOrigin: 'top center'
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5
          }}
        />
      ))}

      {/* Water surface simulation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
        animate={{
          scaleX: [0.8, 1.2, 0.8],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Depth layers - darker particles in background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`depth-${i}`}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            backgroundColor: 'rgba(14, 165, 233, 0.4)',
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 30 - 15, 0],
            scale: [0.5, 1, 0.5],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;