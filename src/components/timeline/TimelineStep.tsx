'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TimelineStep as Step } from '@/types/timeline'
import { Clock, ChevronDown, ChevronUp, AlertTriangle, Lightbulb, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineStepProps {
  step: Step
  isActive: boolean
  isCompleted: boolean
  showDetails: boolean
  onToggleDetails: () => void
}

export function TimelineStep({
  step,
  isActive,
  isCompleted,
  showDetails,
  onToggleDetails
}: TimelineStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Step Header */}
      <div className="flex items-start gap-6">
        <motion.div 
          className={cn(
            "w-20 h-20 rounded-2xl flex items-center justify-center",
            "glass-panel border-2 transition-all duration-300"
          )}
          style={{
            background: `linear-gradient(135deg, ${step.bgColor.replace('from-', '').replace('/20', '/30').replace(' to-', ', ')})`
          }}
          animate={{
            scale: isActive ? 1.05 : 1,
            boxShadow: isActive ? '0 0 30px rgba(6, 182, 212, 0.3)' : '0 8px 32px rgba(31, 38, 135, 0.37)'
          }}
        >
          <div className={cn(step.color, "transition-colors duration-300")}>
            {step.icon}
          </div>
        </motion.div>
        
        <div className="flex-1">
          <motion.h2 
            className="font-display font-bold text-3xl md:text-4xl text-white mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {step.title}
          </motion.h2>
          
          <div className="flex items-center gap-4 text-slate-400 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{step.duration}</span>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border",
              step.difficulty === 'Easy' && "bg-green-500/20 text-green-300 border-green-500/30",
              step.difficulty === 'Medium' && "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
              step.difficulty === 'Hard' && "bg-red-500/20 text-red-300 border-red-500/30"
            )}>
              {step.difficulty}
            </div>
          </div>
          
          <motion.p 
            className="text-lg text-slate-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {step.description}
          </motion.p>
        </div>
      </div>

      {/* Detailed Description */}
      {step.detailedDescription && (
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-slate-300 leading-relaxed">
            {step.detailedDescription}
          </p>
        </motion.div>
      )}

      {/* Tips Section */}
      {step.tips.length > 0 && (
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-white">Pro Tips</h3>
          </div>
          <ul className="space-y-2">
            {step.tips.map((tip, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-2 text-slate-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
              >
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Warnings Section */}
      {step.warnings && step.warnings.length > 0 && (
        <motion.div 
          className="glass-card border-orange-500/30 bg-orange-500/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-orange-300">Important Warnings</h3>
          </div>
          <ul className="space-y-2">
            {step.warnings.map((warning, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-2 text-orange-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
              >
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                <span>{warning}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Products Section */}
      {step.products.length > 0 && (
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5 text-aqua-400" />
            <h3 className="font-semibold text-white">Required Products</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {step.products.map((productId, index) => (
              <motion.div 
                key={productId}
                className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 hover:border-aqua-500/30 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white capitalize">
                      {productId.replace('-', ' ').replace(/([A-Z])/g, ' $1')}
                    </h4>
                    <p className="text-sm text-slate-400 capitalize">
                      {productId.split('-')[0]} equipment
                    </p>
                  </div>
                  <button 
                    className="text-aqua-400 hover:text-aqua-300 transition-colors duration-200"
                    onClick={() => {
                      // TODO: Add to cart functionality
                      console.log('Add to cart:', productId)
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Toggle Details Button */}
      <motion.button
        onClick={onToggleDetails}
        className="w-full glass-card py-4 flex items-center justify-center gap-2 hover:bg-white/15 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="text-slate-300 font-medium">
          {showDetails ? 'Hide' : 'Show'} Additional Details
        </span>
        {showDetails ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </motion.button>

      {/* Additional Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="space-y-4">
              {/* Detailed Timeline */}
              <div className="glass-card">
                <h3 className="font-semibold text-white mb-4">Step Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-aqua-400 rounded-full" />
                    <span className="text-slate-300">Preparation (20%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full" />
                    <span className="text-slate-300">Main Work (60%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                    <span className="text-slate-300">Finishing (20%)</span>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="glass-card border-red-500/30 bg-red-500/10">
                <h3 className="font-semibold text-red-300 mb-4">Common Mistakes to Avoid</h3>
                <ul className="space-y-2 text-red-200">
                  <li>• Rushing through this step</li>
                  <li>• Skipping water parameter testing</li>
                  <li>• Using untreated tap water</li>
                  <li>• Not allowing proper settling time</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}