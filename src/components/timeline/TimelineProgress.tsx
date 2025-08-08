'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TimelineStep } from '@/types/timeline'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineProgressProps {
  steps: TimelineStep[]
  currentStep: number
  completedSteps: number[]
  onStepClick: (step: number) => void
  isPlaying: boolean
}

export function TimelineProgress({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  isPlaying
}: TimelineProgressProps) {
  const progress = (currentStep / (steps.length - 1)) * 100

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Timeline Line Background */}
          <div className="timeline-line" />
          
          {/* Timeline Progress */}
          <motion.div 
            className="timeline-progress"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 1,
              ease: "easeInOut"
            }}
          />
          
          {/* Timeline Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStep
              const isCompleted = completedSteps.includes(index)
              const isPending = !isCompleted && !isActive
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1
                  }}
                  className="relative z-10 flex flex-col items-center"
                >
                  {/* Step Circle */}
                  <motion.button
                    onClick={() => !isPlaying && onStepClick(index)}
                    disabled={isPlaying}
                    className={cn(
                      "timeline-step",
                      isActive && "active",
                      isCompleted && "completed",
                      isPending && "pending",
                      isPlaying && "cursor-not-allowed"
                    )}
                    whileHover={!isPlaying ? { scale: 1.1 } : {}}
                    whileTap={!isPlaying ? { scale: 0.95 } : {}}
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${step.bgColor.replace('from-', '').replace('/20', '').replace(' to-', ', ')})` 
                        : undefined
                    }}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        rotateY: isCompleted ? 360 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex items-center justify-center",
                        isCompleted ? "text-white" : step.color
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8" />
                      ) : (
                        <div className="transition-all duration-300">
                          {step.icon}
                        </div>
                      )}
                    </motion.div>
                    
                    {/* Active Step Pulse Effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-aqua-300"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ 
                          scale: [1, 1.3, 1], 
                          opacity: [1, 0, 1] 
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.button>
                  
                  {/* Step Info */}
                  <motion.div 
                    className="absolute top-20 text-center min-w-0 max-w-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className={cn(
                      "font-semibold text-sm transition-colors duration-300",
                      isActive ? "text-aqua-300" : "text-slate-400"
                    )}>
                      Step {index + 1}
                    </div>
                    <div className={cn(
                      "text-xs mt-1 whitespace-nowrap transition-colors duration-300",
                      isActive ? "text-slate-200" : "text-slate-500"
                    )}>
                      {step.title}
                    </div>
                    <div className={cn(
                      "text-xs mt-1 transition-colors duration-300",
                      isActive ? "text-aqua-400" : "text-slate-600"
                    )}>
                      {step.duration}
                    </div>
                  </motion.div>

                  {/* Difficulty Badge */}
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <span className={cn(
                      "inline-block px-2 py-1 rounded-full text-xs font-medium",
                      step.difficulty === 'Easy' && "bg-green-500/20 text-green-300 border border-green-500/30",
                      step.difficulty === 'Medium' && "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
                      step.difficulty === 'Hard' && "bg-red-500/20 text-red-300 border border-red-500/30"
                    )}>
                      {step.difficulty}
                    </span>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Progress Stats */}
        <motion.div 
          className="mt-16 glass-card max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center">
            <h3 className="font-semibold text-lg text-white mb-4">
              Progress Overview
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-aqua-300">
                  {completedSteps.length}
                </div>
                <div className="text-sm text-slate-400">
                  Completed
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-300">
                  {currentStep + 1}
                </div>
                <div className="text-sm text-slate-400">
                  Current
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-300">
                  {steps.length}
                </div>
                <div className="text-sm text-slate-400">
                  Total Steps
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-aqua-500 to-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: `${((completedSteps.length + (currentStep > completedSteps.length ? 1 : 0)) / steps.length) * 100}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
            
            <div className="mt-2 text-sm text-slate-400">
              {Math.round(((completedSteps.length + (currentStep > completedSteps.length ? 1 : 0)) / steps.length) * 100)}% Complete
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}