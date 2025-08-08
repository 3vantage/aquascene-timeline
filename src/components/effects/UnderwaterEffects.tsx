'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface UnderwaterEffectsProps {
  intensity?: 'low' | 'medium' | 'high'
  isMobile?: boolean
}

export function UnderwaterEffects({ intensity = 'medium', isMobile = false }: UnderwaterEffectsProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    const particleCount = isMobile ? 15 : intensity === 'low' ? 20 : intensity === 'medium' ? 30 : 50
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
    }))
    
    setParticles(newParticles)
  }, [intensity, isMobile])

  return (
    <>
      {/* Water Caustics Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 water-caustics opacity-30"
          animate={{
            backgroundPosition: [
              '0% 0%, 50% 50%, 100% 0%',
              '100% 100%, 0% 50%, 50% 100%',
              '0% 0%, 50% 50%, 100% 0%'
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Light Refraction Rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: isMobile ? 2 : 4 }).map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute w-32 h-full bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent"
            style={{
              left: `${20 + i * 25}%`,
              transform: 'rotate(15deg) skewX(-10deg)',
            }}
            animate={{
              x: [-100, typeof window !== 'undefined' ? window.innerWidth + 100 : 1000],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-cyan-400/30 rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(particle.id) * 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + particle.delay,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Underwater Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Bubble Streams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => (
          <div key={`bubble-stream-${i}`} className="absolute" style={{ left: `${15 + i * 15}%` }}>
            {Array.from({ length: 3 }).map((_, bubbleIndex) => (
              <motion.div
                key={`bubble-${i}-${bubbleIndex}`}
                className="absolute bg-cyan-300/20 rounded-full border border-cyan-300/30"
                style={{
                  width: `${8 + Math.random() * 12}px`,
                  height: `${8 + Math.random() * 12}px`,
                }}
                initial={{
                  y: '100vh',
                  x: 0,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  y: '-10vh',
                  x: [0, Math.sin(i + bubbleIndex) * 20, 0],
                  scale: [0, 1, 0.8, 0],
                  opacity: [0, 0.7, 0.5, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: bubbleIndex * 2 + i * 0.5,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Gentle Water Movement Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.06) 0%, transparent 45%),
            radial-gradient(ellipse at 40% 80%, rgba(14, 165, 233, 0.05) 0%, transparent 40%)
          `,
        }}
        animate={{
          backgroundPosition: [
            '0% 0%, 100% 100%, 50% 50%',
            '100% 50%, 0% 50%, 100% 0%',
            '0% 0%, 100% 100%, 50% 50%',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </>
  )
}