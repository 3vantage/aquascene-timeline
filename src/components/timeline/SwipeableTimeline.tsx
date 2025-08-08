'use client'

import React from 'react'
import { motion, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TimelineStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface SwipeableTimelineProps {
  steps: TimelineStep[]
  currentStep: number
  onStepChange: (step: number) => void
  completedSteps: number[]
  isAutoPlaying: boolean
}

export function SwipeableTimeline({ 
  steps, 
  currentStep, 
  onStepChange, 
  completedSteps,
  isAutoPlaying 
}: SwipeableTimelineProps) {
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    
    if (Math.abs(info.offset.x) > threshold && !isAutoPlaying) {
      if (info.offset.x > 0 && currentStep > 0) {
        onStepChange(currentStep - 1)
      } else if (info.offset.x < 0 && currentStep < steps.length - 1) {
        onStepChange(currentStep + 1)
      }
    }
  }

  return (
    <div className="relative py-6">
      {/* Swipe Instructions */}
      <div className="flex items-center justify-center gap-2 text-cyan-300 text-sm mb-6">
        <ChevronLeft className="w-4 h-4 animate-pulse" />
        <span>Swipe to navigate timeline</span>
        <ChevronRight className="w-4 h-4 animate-pulse" />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-cyan-400 scale-125'
                  : completedSteps.includes(index)
                  ? 'bg-emerald-400'
                  : 'bg-slate-600'
              }`}
              whileTap={{ scale: 0.8 }}
              onClick={() => !isAutoPlaying && onStepChange(index)}
            />
          ))}
        </div>
      </div>

      {/* Swipeable Content Container */}
      <motion.div
        className="relative overflow-hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <div className="relative h-64 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl backdrop-blur-sm border border-slate-700/50 overflow-hidden">
          {/* Current Step Content */}
          <motion.div
            key={currentStep}
            className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon */}
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${steps[currentStep].bgColor} flex items-center justify-center mb-4`}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className={steps[currentStep].color}>
                {steps[currentStep].icon}
              </div>
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3">
              {steps[currentStep].title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {steps[currentStep].description}
            </p>

            {/* Progress */}
            <div className="mt-4 text-xs text-slate-400">
              Step {currentStep + 1} of {steps.length}
            </div>
          </motion.div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className={`w-full h-full bg-gradient-to-br ${steps[currentStep].bgColor}`} />
          </div>

          {/* Drag Hint */}
          {!isAutoPlaying && (
            <motion.div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 1 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <ChevronLeft className="w-3 h-3" />
                <div className="w-8 h-1 bg-slate-600 rounded-full" />
                <ChevronRight className="w-3 h-3" />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Navigation Buttons for Accessibility */}
      <div className="flex justify-between items-center mt-6">
        <motion.button
          onClick={() => !isAutoPlaying && currentStep > 0 && onStepChange(currentStep - 1)}
          disabled={currentStep === 0 || isAutoPlaying}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only sm:not-sr-only">Previous</span>
        </motion.button>

        <div className="text-center">
          <div className="text-sm font-semibold text-white">
            {steps[currentStep].title}
          </div>
          <div className="text-xs text-slate-400">
            {currentStep + 1} / {steps.length}
          </div>
        </div>

        <motion.button
          onClick={() => !isAutoPlaying && currentStep < steps.length - 1 && onStepChange(currentStep + 1)}
          disabled={currentStep === steps.length - 1 || isAutoPlaying}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          whileTap={{ scale: 0.95 }}
        >
          <span className="sr-only sm:not-sr-only">Next</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}