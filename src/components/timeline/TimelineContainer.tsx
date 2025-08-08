'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TimelineStep as Step, TimelineState } from '@/types/timeline'
import { timelineSteps, defaultTimelineState } from '@/lib/timeline-data'
import { TimelineProgress } from './TimelineProgress'
import { TimelineStep } from './TimelineStep'
import { StepVisualizer } from './StepVisualizer'
import { TimelineControls } from './TimelineControls'
import { TimelineMobile } from './TimelineMobile'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

export function TimelineContainer() {
  const [state, setState] = useState<TimelineState>(defaultTimelineState)
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  const currentStep = timelineSteps[state.currentStep]

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (state.isAutoPlaying && state.animationState === 'idle') {
      interval = setInterval(() => {
        setState(prev => {
          if (prev.currentStep < timelineSteps.length - 1) {
            return {
              ...prev,
              currentStep: prev.currentStep + 1,
              completedSteps: [...prev.completedSteps, prev.currentStep],
              animationState: 'transitioning'
            }
          } else {
            return {
              ...prev,
              isAutoPlaying: false,
              animationState: 'idle'
            }
          }
        })
      }, state.playSpeed)
    }
    
    return () => clearInterval(interval)
  }, [state.isAutoPlaying, state.playSpeed, state.animationState])

  // Animation state management
  useEffect(() => {
    if (state.animationState === 'transitioning') {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, animationState: 'idle' }))
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [state.animationState])

  // Control functions
  const controls = {
    play: useCallback(() => {
      setState(prev => ({ 
        ...prev, 
        isAutoPlaying: true,
        animationState: 'playing'
      }))
    }, []),

    pause: useCallback(() => {
      setState(prev => ({ 
        ...prev, 
        isAutoPlaying: false,
        animationState: 'idle'
      }))
    }, []),

    reset: useCallback(() => {
      setState({
        ...defaultTimelineState,
        viewMode: isMobile ? 'mobile' : 'desktop'
      })
    }, [isMobile]),

    goToStep: useCallback((step: number) => {
      if (step >= 0 && step < timelineSteps.length && !state.isAutoPlaying) {
        setState(prev => ({
          ...prev,
          currentStep: step,
          completedSteps: Array.from({ length: step }, (_, i) => i),
          animationState: 'transitioning'
        }))
      }
    }, [state.isAutoPlaying]),

    nextStep: useCallback(() => {
      if (state.currentStep < timelineSteps.length - 1 && !state.isAutoPlaying) {
        const nextStep = state.currentStep + 1
        setState(prev => ({
          ...prev,
          currentStep: nextStep,
          completedSteps: Array.from({ length: nextStep }, (_, i) => i),
          animationState: 'transitioning'
        }))
      }
    }, [state.currentStep, state.isAutoPlaying]),

    previousStep: useCallback(() => {
      if (state.currentStep > 0 && !state.isAutoPlaying) {
        setState(prev => ({
          ...prev,
          currentStep: prev.currentStep - 1,
          completedSteps: prev.completedSteps.filter(step => step < prev.currentStep - 1),
          animationState: 'transitioning'
        }))
      }
    }, [state.currentStep, state.isAutoPlaying]),

    setPlaySpeed: useCallback((speed: number) => {
      setState(prev => ({ ...prev, playSpeed: speed }))
    }, []),

    toggleDetails: useCallback(() => {
      setState(prev => ({ ...prev, showDetails: !prev.showDetails }))
    }, [])
  }

  // Update view mode based on screen size
  useEffect(() => {
    setState(prev => ({
      ...prev,
      viewMode: isMobile ? 'mobile' : 'desktop'
    }))
  }, [isMobile])

  if (isMobile) {
    return (
      <TimelineMobile
        steps={timelineSteps}
        state={state}
        controls={controls}
        currentStep={currentStep}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-gradient-shift" />
        <div className="absolute inset-0 water-caustics opacity-30" />
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative pt-20 pb-16 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-aqua-gradient">
              Aquascaping
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Timeline
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Follow the complete journey from empty tank to thriving aquatic ecosystem. 
            Experience each stage with interactive animations and expert guidance.
          </motion.p>
          
          <TimelineControls 
            state={state}
            controls={controls}
            totalSteps={timelineSteps.length}
          />
        </div>
      </motion.section>

      {/* Timeline Progress */}
      <motion.section 
        className="relative py-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <TimelineProgress
          steps={timelineSteps}
          currentStep={state.currentStep}
          completedSteps={state.completedSteps}
          onStepClick={controls.goToStep}
          isPlaying={state.isAutoPlaying}
        />
      </motion.section>

      {/* Main Content */}
      <motion.section 
        className="relative py-16 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            
            {/* Step Content */}
            <motion.div 
              key={state.currentStep}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <TimelineStep
                step={currentStep}
                isActive={true}
                isCompleted={state.completedSteps.includes(state.currentStep)}
                showDetails={state.showDetails}
                onToggleDetails={controls.toggleDetails}
              />

              {/* Navigation */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={controls.previousStep}
                  disabled={state.currentStep === 0 || state.isAutoPlaying}
                  className={cn(
                    "btn-glass flex-1 md:flex-none",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  Previous Step
                </button>
                <button
                  onClick={controls.nextStep}
                  disabled={state.currentStep === timelineSteps.length - 1 || state.isAutoPlaying}
                  className={cn(
                    "btn-aqua flex-1 md:flex-none",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  Next Step
                </button>
              </div>
            </motion.div>

            {/* Visual Representation */}
            <motion.div 
              key={`visualizer-${state.currentStep}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sticky top-8"
            >
              <StepVisualizer
                step={currentStep}
                stepNumber={state.currentStep}
                isActive={state.animationState !== 'idle'}
                completedSteps={state.completedSteps}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="relative py-24 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center glass-card">
            <h2 className="font-display font-bold text-4xl text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Transform your vision into a living aquatic masterpiece. 
              Get personalized guidance and premium supplies.
            </p>
            
            <motion.button
              className="btn-aqua px-8 py-4 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Your Aquascape
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}