'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TimelineState, TimelineControls as Controls } from '@/types/timeline'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward,
  Settings,
  Zap,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineControlsProps {
  state: TimelineState
  controls: Controls & {
    toggleDetails: () => void
  }
  totalSteps: number
}

export function TimelineControls({
  state,
  controls,
  totalSteps
}: TimelineControlsProps) {
  const speedOptions = [
    { value: 4000, label: 'Slow', icon: '🐢' },
    { value: 3000, label: 'Normal', icon: '🚶' },
    { value: 2000, label: 'Fast', icon: '🏃' },
    { value: 1000, label: 'Very Fast', icon: '⚡' }
  ]

  return (
    <motion.div 
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {/* Main Control Panel */}
      <div className="glass-card px-8 py-6">
        <div className="flex items-center gap-4">
          {/* Previous Step */}
          <motion.button
            onClick={controls.previousStep}
            disabled={state.currentStep === 0 || state.isAutoPlaying}
            className={cn(
              "p-3 rounded-xl transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "glass-panel hover:bg-white/20 active:scale-95"
            )}
            whileHover={
              !(state.currentStep === 0 || state.isAutoPlaying) 
                ? { scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' } 
                : {}
            }
            whileTap={{ scale: 0.95 }}
          >
            <SkipBack className="w-6 h-6 text-slate-300" />
          </motion.button>

          {/* Play/Pause Button */}
          <motion.button
            onClick={state.isAutoPlaying ? controls.pause : controls.play}
            disabled={state.currentStep === totalSteps - 1 && !state.isAutoPlaying}
            className={cn(
              "p-4 rounded-xl font-semibold text-lg transition-all duration-300",
              "bg-gradient-to-r from-aqua-500 to-blue-500 text-white",
              "hover:from-aqua-600 hover:to-blue-600",
              "shadow-lg hover:shadow-xl",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center gap-3"
            )}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 8px 30px rgba(6, 182, 212, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {state.isAutoPlaying ? (
              <>
                <Pause className="w-6 h-6" />
                <span>Pause Timeline</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                <span>
                  {state.currentStep === totalSteps - 1 
                    ? 'Timeline Complete' 
                    : 'Play Timeline'
                  }
                </span>
              </>
            )}
          </motion.button>

          {/* Next Step */}
          <motion.button
            onClick={controls.nextStep}
            disabled={state.currentStep === totalSteps - 1 || state.isAutoPlaying}
            className={cn(
              "p-3 rounded-xl transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "glass-panel hover:bg-white/20 active:scale-95"
            )}
            whileHover={
              !(state.currentStep === totalSteps - 1 || state.isAutoPlaying) 
                ? { scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' } 
                : {}
            }
            whileTap={{ scale: 0.95 }}
          >
            <SkipForward className="w-6 h-6 text-slate-300" />
          </motion.button>

          {/* Reset Button */}
          <motion.button
            onClick={controls.reset}
            disabled={state.isAutoPlaying}
            className={cn(
              "p-3 rounded-xl transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "glass-panel hover:bg-white/20 active:scale-95 text-orange-400"
            )}
            whileHover={
              !state.isAutoPlaying 
                ? { scale: 1.05, boxShadow: '0 0 20px rgba(251, 146, 60, 0.3)' } 
                : {}
            }
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Speed Control */}
      {!state.isAutoPlaying && (
        <motion.div 
          className="glass-card px-6 py-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Playback Speed:</span>
            </div>
            
            <div className="flex items-center gap-2">
              {speedOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => controls.setPlaySpeed(option.value)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                    "flex items-center gap-2",
                    state.playSpeed === option.value
                      ? "bg-aqua-500/20 text-aqua-300 border border-aqua-500/30"
                      : "glass-panel text-slate-400 hover:text-slate-300"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Status Indicator */}
      <motion.div 
        className="glass-card px-6 py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              state.isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-slate-400"
            )} />
            <span className="text-slate-300">
              Status: {state.isAutoPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>
          
          <div className="w-px h-4 bg-slate-600" />
          
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-300">
              Mode: {state.animationState === 'transitioning' ? 'Transitioning' : 'Ready'}
            </span>
          </div>

          <div className="w-px h-4 bg-slate-600" />

          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300">
              View: {state.viewMode}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.button
          onClick={controls.toggleDetails}
          className="btn-glass text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {state.showDetails ? 'Hide Details' : 'Show Details'}
        </motion.button>
        
        <motion.button
          onClick={() => controls.goToStep(Math.floor(totalSteps / 2))}
          disabled={state.isAutoPlaying}
          className={cn(
            "btn-glass text-sm",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          whileHover={!state.isAutoPlaying ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
        >
          Jump to Middle
        </motion.button>
        
        <motion.button
          onClick={() => controls.goToStep(totalSteps - 1)}
          disabled={state.isAutoPlaying || state.currentStep === totalSteps - 1}
          className={cn(
            "btn-glass text-sm",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          whileHover={
            !(state.isAutoPlaying || state.currentStep === totalSteps - 1) 
              ? { scale: 1.05 } 
              : {}
          }
          whileTap={{ scale: 0.95 }}
        >
          Skip to End
        </motion.button>
      </motion.div>

      {/* Keyboard Shortcuts Info */}
      <motion.div 
        className="glass-card px-4 py-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className="text-xs text-slate-400 mb-1">Keyboard Shortcuts:</p>
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
          <span><kbd className="bg-slate-700 px-1 rounded">Space</kbd> Play/Pause</span>
          <span><kbd className="bg-slate-700 px-1 rounded">←</kbd> Previous</span>
          <span><kbd className="bg-slate-700 px-1 rounded">→</kbd> Next</span>
          <span><kbd className="bg-slate-700 px-1 rounded">R</kbd> Reset</span>
        </div>
      </motion.div>
    </motion.div>
  )
}