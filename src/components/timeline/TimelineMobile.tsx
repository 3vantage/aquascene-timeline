'use client'

import React, { useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { TimelineStep, TimelineState, TimelineControls } from '@/types/timeline'
import { StepVisualizer } from './StepVisualizer'
import { TimelineStep as StepComponent } from './TimelineStep'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineMobileProps {
  steps: TimelineStep[]
  state: TimelineState
  controls: TimelineControls & {
    toggleDetails: () => void
  }
  currentStep: TimelineStep
}

export function TimelineMobile({
  steps,
  state,
  controls,
  currentStep
}: TimelineMobileProps) {
  const constraintsRef = useRef(null)

  const handleSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (state.isAutoPlaying) return
    
    const swipeThreshold = 50
    const velocity = info.velocity.x
    
    if (info.offset.x > swipeThreshold || velocity > 500) {
      // Swipe right - previous step
      controls.previousStep()
    } else if (info.offset.x < -swipeThreshold || velocity < -500) {
      // Swipe left - next step  
      controls.nextStep()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900/20 to-indigo-900/20">
      {/* Mobile Header */}
      <motion.div 
        className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-bold text-xl text-aqua-gradient">
                Aquascaping Timeline
              </h1>
              <p className="text-sm text-slate-400">
                Step {state.currentStep + 1} of {steps.length}
              </p>
            </div>
            
            <motion.button
              onClick={state.isAutoPlaying ? controls.pause : controls.play}
              disabled={state.currentStep === steps.length - 1 && !state.isAutoPlaying}
              className="btn-aqua p-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {state.isAutoPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Mobile Progress Bar */}
          <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-aqua-500 to-blue-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ 
                width: `${((state.completedSteps.length + (state.currentStep > state.completedSteps.length ? 1 : 0)) / steps.length) * 100}%` 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Start</span>
            <span>{Math.round(((state.completedSteps.length + (state.currentStep > state.completedSteps.length ? 1 : 0)) / steps.length) * 100)}%</span>
            <span>Complete</span>
          </div>
        </div>
      </motion.div>

      {/* Swipeable Content */}
      <div className="relative overflow-hidden" ref={constraintsRef}>
        <motion.div
          key={state.currentStep}
          className="px-4 py-6"
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          onDragEnd={handleSwipe}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          {/* Tank Visualizer */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StepVisualizer
              step={currentStep}
              stepNumber={state.currentStep}
              isActive={state.animationState !== 'idle'}
              completedSteps={state.completedSteps}
            />
          </motion.div>

          {/* Step Content */}
          <StepComponent
            step={currentStep}
            isActive={true}
            isCompleted={state.completedSteps.includes(state.currentStep)}
            showDetails={state.showDetails}
            onToggleDetails={controls.toggleDetails}
          />
        </motion.div>

        {/* Swipe Indicators */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between pointer-events-none">
          <AnimatePresence>
            {state.currentStep > 0 && !state.isAutoPlaying && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.6, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="glass-panel p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6 text-slate-300" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {state.currentStep < steps.length - 1 && !state.isAutoPlaying && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 0.6, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="glass-panel p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6 text-slate-300" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sticky bottom-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-700">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <motion.button
              onClick={controls.previousStep}
              disabled={state.currentStep === 0 || state.isAutoPlaying}
              className={cn(
                "flex-1 btn-glass py-3 text-sm",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              whileHover={
                !(state.currentStep === 0 || state.isAutoPlaying) 
                  ? { scale: 1.02 } 
                  : {}
              }
              whileTap={{ scale: 0.98 }}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </motion.button>
            
            <motion.button
              onClick={controls.reset}
              disabled={state.isAutoPlaying}
              className={cn(
                "px-4 py-3 glass-panel rounded-xl text-orange-400",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              whileHover={!state.isAutoPlaying ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
            
            <motion.button
              onClick={controls.nextStep}
              disabled={state.currentStep === steps.length - 1 || state.isAutoPlaying}
              className={cn(
                "flex-1 btn-aqua py-3 text-sm",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              whileHover={
                !(state.currentStep === steps.length - 1 || state.isAutoPlaying) 
                  ? { scale: 1.02 } 
                  : {}
              }
              whileTap={{ scale: 0.98 }}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Step Dots */}
      <motion.div 
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="glass-panel px-4 py-2 rounded-full">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => !state.isAutoPlaying && controls.goToStep(index)}
                disabled={state.isAutoPlaying}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === state.currentStep 
                    ? "bg-aqua-400 w-4" 
                    : state.completedSteps.includes(index)
                    ? "bg-green-400"
                    : "bg-slate-600"
                )}
                whileHover={!state.isAutoPlaying ? { scale: 1.2 } : {}}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Touch Hint */}
      <AnimatePresence>
        {state.currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className="glass-panel px-4 py-2 rounded-full text-sm text-slate-300">
              <span>👆 Swipe left/right to navigate</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-gradient-shift opacity-20" />
        <div className="absolute inset-0 water-caustics opacity-10" />
      </div>
    </div>
  )
}