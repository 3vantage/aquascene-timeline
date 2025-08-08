'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TimelineStep } from '@/types/timeline'
import { Fish, Droplets } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepVisualizerProps {
  step: TimelineStep
  stepNumber: number
  isActive: boolean
  completedSteps: number[]
}

export function StepVisualizer({
  step,
  stepNumber,
  isActive,
  completedSteps
}: StepVisualizerProps) {
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; delay: number }>>([])
  
  // Generate bubbles for water stages
  useEffect(() => {
    if (stepNumber >= 4) { // After flooding stage
      const newBubbles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10, // 10-90% from left
        delay: Math.random() * 3
      }))
      setBubbles(newBubbles)
    }
  }, [stepNumber])

  const tankLayers = {
    substrate: stepNumber >= 2,
    hardscape: stepNumber >= 1,
    plants: stepNumber >= 3,
    water: stepNumber >= 4,
    cycling: stepNumber >= 5,
    fish: stepNumber >= 6,
    mature: stepNumber >= 7
  }

  return (
    <div className="relative">
      {/* Main Tank Container */}
      <motion.div 
        className="tank-container"
        initial={{ opacity: 0, rotateY: -15 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-800/30 to-blue-900/40" />

        {/* Water Caustics Effect */}
        {tankLayers.water && (
          <motion.div
            className="absolute inset-0 water-caustics opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
          />
        )}

        {/* Substrate Layer */}
        <AnimatePresence>
          {tankLayers.substrate && (
            <motion.div
              key="substrate"
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '4rem', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Substrate texture */}
              <div className="absolute inset-0 opacity-60">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-900 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: Math.random() * 0.5 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hardscape Elements */}
        <AnimatePresence>
          {tankLayers.hardscape && (
            <>
              {/* Main rock */}
              <motion.div
                key="rock1"
                className="absolute bottom-16 left-8 w-20 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-lg"
                initial={{ scale: 0, rotateZ: -20, y: 50 }}
                animate={{ scale: 1, rotateZ: 12, y: 0 }}
                exit={{ scale: 0, y: 50 }}
                transition={{ 
                  duration: 1, 
                  ease: "backOut",
                  type: "spring",
                  stiffness: 100
                }}
                style={{ transformOrigin: 'bottom center' }}
              />
              
              {/* Secondary rock */}
              <motion.div
                key="rock2"
                className="absolute bottom-16 right-12 w-16 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-lg"
                initial={{ scale: 0, rotateZ: 15, y: 50 }}
                animate={{ scale: 1, rotateZ: -6, y: 0 }}
                exit={{ scale: 0, y: 50 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.3,
                  ease: "backOut",
                  type: "spring",
                  stiffness: 100
                }}
                style={{ transformOrigin: 'bottom center' }}
              />

              {/* Driftwood */}
              <motion.div
                key="wood"
                className="absolute bottom-20 left-1/2 w-12 h-8 bg-gradient-to-r from-amber-900 to-amber-700 rounded-full"
                initial={{ scale: 0, rotateZ: 0 }}
                animate={{ scale: 1, rotateZ: 25 }}
                exit={{ scale: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.6,
                  ease: "easeOut"
                }}
                style={{ transformOrigin: 'bottom center' }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Plants */}
        <AnimatePresence>
          {tankLayers.plants && (
            <>
              {/* Foreground carpet plants */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`carpet-${i}`}
                  className="absolute bottom-16 w-3 h-3 bg-green-500 rounded-full"
                  style={{ 
                    left: `${15 + (i * 8)}%`,
                    bottom: `${4 + Math.random() * 2}rem`
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}

              {/* Background stem plants */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={`stem-${i}`}
                  className="absolute bg-gradient-to-t from-green-600 to-green-400 rounded-t-full"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    bottom: '4rem',
                    width: '0.5rem',
                    height: `${2 + Math.random() * 3}rem`,
                    transformOrigin: 'bottom center'
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                >
                  {/* Plant sway animation */}
                  <motion.div
                    animate={{ rotateZ: [-1, 1, -1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-full"
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Water Level */}
        <AnimatePresence>
          {tankLayers.water && (
            <motion.div
              key="water"
              className="absolute inset-x-0 top-8 bottom-0 bg-gradient-to-b from-cyan-500/10 via-blue-600/20 to-blue-800/30"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ 
                duration: 2.5,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: 'bottom center' }}
            >
              {/* Water surface ripples */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
                animate={{ x: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bubbles during cycling */}
        <AnimatePresence>
          {tankLayers.cycling && (
            <>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  className="absolute w-2 h-2 bg-cyan-300/40 rounded-full bubble"
                  style={{
                    left: `${bubble.x}%`,
                    bottom: '20%'
                  }}
                  initial={{ 
                    y: 0, 
                    scale: 0.5,
                    opacity: 0
                  }}
                  animate={{ 
                    y: -200,
                    scale: [0.5, 1, 0.8],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 4,
                    delay: bubble.delay,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Fish */}
        <AnimatePresence>
          {tankLayers.fish && (
            <>
              <motion.div
                key="fish1"
                className="absolute top-1/3 text-orange-400"
                initial={{ x: -50, opacity: 0, scale: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                exit={{ x: -50, opacity: 0 }}
                transition={{
                  duration: 2,
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{ left: '25%' }}
              >
                <Fish className="w-6 h-6" />
              </motion.div>

              <motion.div
                key="fish2"
                className="absolute top-1/2 text-blue-400"
                initial={{ x: 50, opacity: 0, scale: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1, 
                  scale: 1,
                  y: [0, 8, 0]
                }}
                exit={{ x: 50, opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{ right: '30%' }}
              >
                <Fish className="w-5 h-5 transform scale-x-[-1]" />
              </motion.div>

              <motion.div
                key="fish3"
                className="absolute top-2/3 text-purple-400"
                initial={{ x: -30, opacity: 0, scale: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -5, 0]
                }}
                exit={{ x: -30, opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: 1,
                  y: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{ left: '40%' }}
              >
                <Fish className="w-4 h-4" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mature stage effects */}
        <AnimatePresence>
          {tankLayers.mature && (
            <>
              {/* Enhanced plant growth */}
              <motion.div
                key="mature-overlay"
                className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-green-600/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              />

              {/* Particle effects */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 80 + 10}%`
                  }}
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 5, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Step Progress Indicator */}
        <motion.div 
          className="absolute top-2 left-2 glass-panel rounded-lg px-3 py-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-sm font-semibold text-white">
            Step {stepNumber + 1}
          </div>
          <div className="text-xs text-slate-300">
            {step.title}
          </div>
        </motion.div>

        {/* Active Step Glow */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-aqua-400/50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Step Information Card */}
      <motion.div 
        className="mt-6 glass-card text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="font-bold text-xl text-white mb-2">
          {step.title}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {step.description}
        </p>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-400">
          <span>{step.duration}</span>
          <span>•</span>
          <span className={cn(
            "font-medium",
            step.difficulty === 'Easy' && "text-green-400",
            step.difficulty === 'Medium' && "text-yellow-400",
            step.difficulty === 'Hard' && "text-red-400"
          )}>
            {step.difficulty}
          </span>
        </div>
      </motion.div>
    </div>
  )
}