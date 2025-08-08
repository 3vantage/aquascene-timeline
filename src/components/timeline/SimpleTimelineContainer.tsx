'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { UnderwaterEffects } from '@/components/effects/UnderwaterEffects'
import { SwipeableTimeline } from '@/components/timeline/SwipeableTimeline'
import { 
  Settings, 
  Mountain, 
  Droplets, 
  Leaf, 
  Fish, 
  Sparkles,
  Clock,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface TimelineStep {
  id: string
  title: string
  description: string
  detailedDescription: string
  icon: React.ReactNode
  duration: string
  difficulty: string
  color: string
  bgColor: string
  imageUrl: string
}

const timelineSteps: TimelineStep[] = [
  {
    id: 'setup',
    title: 'Tank Setup',
    description: 'Prepare the empty tank and essential equipment for your aquascaping journey.',
    detailedDescription: 'Start with a clean, empty tank and gather all necessary equipment. This foundational step sets the stage for your entire aquascaping project.',
    icon: <Settings className="w-8 h-8" />,
    duration: '1-2 hours',
    difficulty: 'Easy',
    color: 'text-slate-400',
    bgColor: 'from-slate-500/20 to-gray-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'hardscape',
    title: 'Hardscape Design',
    description: 'Create the foundation with stones and driftwood to establish your aquascape structure.',
    detailedDescription: 'Position stones and driftwood to create depth, focal points, and natural pathways. This is where artistic vision meets technical planning.',
    icon: <Mountain className="w-8 h-8" />,
    duration: '2-4 hours',
    difficulty: 'Medium',
    color: 'text-amber-400',
    bgColor: 'from-amber-500/20 to-orange-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'substrate',
    title: 'Substrate Addition',
    description: 'Layer nutrient-rich aqua soil to create the foundation for healthy plant growth.',
    detailedDescription: 'Add aqua soil and create gentle slopes to enhance the visual depth and provide nutrients for plants.',
    icon: <div className="w-8 h-8 bg-amber-600 rounded-full"></div>,
    duration: '30-45 minutes',
    difficulty: 'Easy',
    color: 'text-amber-500',
    bgColor: 'from-amber-600/20 to-yellow-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'planting',
    title: 'Plant Installation',
    description: 'Carefully plant according to zones: foreground carpets, midground features, background stems.',
    detailedDescription: 'Strategic placement of aquatic plants creates natural beauty and provides oxygen for the ecosystem.',
    icon: <Leaf className="w-8 h-8" />,
    duration: '1-3 hours',
    difficulty: 'Medium',
    color: 'text-green-400',
    bgColor: 'from-green-500/20 to-emerald-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c88a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'flooding',
    title: 'Initial Flooding',
    description: 'Slowly add water using gentle techniques to avoid disturbing the substrate and plants.',
    detailedDescription: 'The critical moment when your dry landscape becomes an aquatic environment. Proper flooding technique preserves your careful work.',
    icon: <Droplets className="w-8 h-8" />,
    duration: '45-60 minutes',
    difficulty: 'Medium',
    color: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cycling',
    title: 'Nitrogen Cycling',
    description: 'Allow beneficial bacteria to establish over 4-6 weeks. Monitor parameters and add nutrients.',
    detailedDescription: 'The invisible but crucial process where beneficial bacteria colonize your tank, creating a stable ecosystem.',
    icon: <div className="w-8 h-8 rounded-full border-4 border-emerald-400 border-dashed animate-spin"></div>,
    duration: '4-6 weeks',
    difficulty: 'Hard',
    color: 'text-emerald-400',
    bgColor: 'from-emerald-500/20 to-teal-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1605649640529-2fdc5c4d1056?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'inhabitants',
    title: 'First Inhabitants',
    description: 'Introduce fish and invertebrates gradually to complete your thriving ecosystem.',
    detailedDescription: 'The rewarding moment when you add life to your aquascape. Careful selection and gradual introduction ensure success.',
    icon: <Fish className="w-8 h-8" />,
    duration: '1-2 weeks',
    difficulty: 'Medium',
    color: 'text-orange-400',
    bgColor: 'from-orange-500/20 to-red-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'mature',
    title: 'Mature Aquascape',
    description: 'Enjoy your completed ecosystem as it develops natural balance and stunning beauty.',
    detailedDescription: 'Your aquascape reaches maturity with established plant growth, stable parameters, and a thriving ecosystem.',
    icon: <Sparkles className="w-8 h-8" />,
    duration: 'Ongoing',
    difficulty: 'Easy',
    color: 'text-purple-400',
    bgColor: 'from-purple-500/20 to-pink-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1517002491449-7b02e2b8c9e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
]

export function SimpleTimelineContainer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})
  const [imageLoading, setImageLoading] = useState<{[key: string]: boolean}>({})  
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50])
  
  // Minimum swipe distance for touch navigation
  const minSwipeDistance = 50

  const currentStepData = timelineSteps[currentStep]

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Preload next images for smoother transitions
  useEffect(() => {
    const preloadImages = () => {
      for (let i = currentStep; i < Math.min(currentStep + 3, timelineSteps.length); i++) {
        const img = new globalThis.Image()
        img.src = timelineSteps[i].imageUrl
      }
    }
    preloadImages()
  }, [currentStep])

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < timelineSteps.length - 1) {
            setCompletedSteps(completed => [...completed, prev])
            return prev + 1
          } else {
            setIsAutoPlaying(false)
            return prev
          }
        })
      }, 4000) // 4 second intervals for better viewing
    }
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const startAutoPlay = () => {
    setCurrentStep(0)
    setCompletedSteps([])
    setIsAutoPlaying(true)
  }

  const pausePlay = () => {
    setIsAutoPlaying(false)
  }

  const resetTimeline = () => {
    setCurrentStep(0)
    setCompletedSteps([])
    setIsAutoPlaying(false)
  }

  const goToStep = (step: number) => {
    if (!isAutoPlaying && step >= 0 && step < timelineSteps.length) {
      setCurrentStep(step)
      setCompletedSteps(Array.from({ length: step }, (_, i) => i))
      
      // Announce step change for screen readers
      const announcement = `Now viewing step ${step + 1}: ${timelineSteps[step].title}`
      const ariaLive = document.createElement('div')
      ariaLive.setAttribute('aria-live', 'polite')
      ariaLive.setAttribute('aria-atomic', 'true')
      ariaLive.className = 'sr-only'
      ariaLive.textContent = announcement
      document.body.appendChild(ariaLive)
      setTimeout(() => document.body.removeChild(ariaLive), 1000)
    }
  }

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentStep < timelineSteps.length - 1 && !isAutoPlaying) {
      nextStep()
    }
    if (isRightSwipe && currentStep > 0 && !isAutoPlaying) {
      previousStep()
    }
  }

  // Drag handlers for desktop
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > minSwipeDistance && !isAutoPlaying) {
      if (info.offset.x > 0 && currentStep > 0) {
        previousStep()
      } else if (info.offset.x < 0 && currentStep < timelineSteps.length - 1) {
        nextStep()
      }
    }
  }

  const nextStep = () => {
    if (currentStep < timelineSteps.length - 1 && !isAutoPlaying) {
      const next = currentStep + 1
      setCurrentStep(next)
      setCompletedSteps(Array.from({ length: next }, (_, i) => i))
    }
  }

  const previousStep = () => {
    if (currentStep > 0 && !isAutoPlaying) {
      setCurrentStep(currentStep - 1)
      setCompletedSteps(completedSteps.filter(step => step < currentStep - 1))
    }
  }

  const handleImageError = (stepId: string) => {
    setImageErrors(prev => ({ ...prev, [stepId]: true }))
    setImageLoading(prev => ({ ...prev, [stepId]: false }))
  }

  const handleImageLoadStart = (stepId: string) => {
    setImageLoading(prev => ({ ...prev, [stepId]: true }))
  }

  const handleImageLoad = (stepId: string) => {
    setImageLoading(prev => ({ ...prev, [stepId]: false }))
  }

  const createFallbackGradient = (step: TimelineStep) => {
    // Extract colors from bgColor string like "from-slate-500/20 to-gray-500/20"
    const colors = step.bgColor.match(/(\w+-\d+)/g) || ['slate-500', 'gray-500']
    return `linear-gradient(135deg, rgb(var(--${colors[0]})) / 0.4, rgb(var(--${colors[1] || colors[0]})) / 0.2)`
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/20 relative overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="main"
      aria-label="Aquascaping Timeline"
    >
      {/* Enhanced Underwater Effects */}
      <UnderwaterEffects 
        intensity={isMobile ? 'low' : 'high'}
        isMobile={isMobile}
      />
      {/* Hero Section */}
      <motion.section 
        className="pt-12 pb-8 md:pt-20 md:pb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y: parallaxY }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="font-display font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Aquascaping
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-green-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Timeline
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Follow the complete journey from empty tank to thriving aquatic ecosystem. 
            Experience each stage with interactive animations and expert guidance.
          </motion.p>
          
          {/* Mobile swipe hint */}
          {isMobile && (
            <motion.div 
              className="flex items-center justify-center gap-2 text-cyan-300 text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              role="hint"
              aria-label="Swipe left or right to navigate timeline steps"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Swipe to navigate</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          )}
          
          {/* Controls */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={isAutoPlaying ? pausePlay : startAutoPlay}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg flex items-center gap-2 sm:gap-3 min-h-[44px] w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isAutoPlaying ? 'Pause automatic timeline progression' : 'Start automatic timeline progression'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">Pause Timeline</span>
                  <span className="sm:hidden">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">Play Timeline</span>
                  <span className="sm:hidden">Play</span>
                </>
              )}
            </motion.button>
            <motion.button
              onClick={resetTimeline}
              className="glass-panel text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/20 transition-all flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Reset timeline to beginning"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              Reset
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Progress */}
      <motion.section 
        className="py-4 md:py-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 right-0 top-1/2 h-0.5 sm:h-1 bg-slate-700 rounded-full"></div>
              <motion.div 
                className="absolute left-0 top-1/2 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (timelineSteps.length - 1)) * 100}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              
              {/* Timeline Steps */}
              <div className="relative flex justify-between">
                {timelineSteps.map((step, index) => (
                  <motion.button
                    key={step.id}
                    data-stage={index}
                    onClick={() => goToStep(index)}
                    className={`relative group z-10 ${index === currentStep ? 'z-20' : ''} min-h-[44px] min-w-[44px] flex items-center justify-center`}
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isAutoPlaying}
                    aria-label={`Go to step ${index + 1}: ${step.title}. ${completedSteps.includes(index) ? 'Completed' : index === currentStep ? 'Current step' : 'Not started'}`}
                    aria-current={index === currentStep ? 'step' : undefined}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 sm:border-4 flex items-center justify-center transition-all duration-300 ${
                      completedSteps.includes(index) 
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30' 
                        : index === currentStep
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-500 border-white text-white scale-110 shadow-2xl shadow-cyan-500/50'
                        : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-slate-500 hover:bg-slate-600'
                    }`}>
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="w-8 h-8" />
                      ) : (
                        <div className={step.color}>
                          {step.icon}
                        </div>
                      )}
                    </div>
                    
                    {/* Step Label */}
                    <div className="absolute top-14 sm:top-16 md:top-20 left-1/2 transform -translate-x-1/2 text-center">
                      <div className={`font-semibold text-xs sm:text-sm ${
                        index === currentStep ? 'text-white' : 'text-slate-400'
                      }`}>
                        Step {index + 1}
                      </div>
                      <div className={`text-xs mt-1 whitespace-nowrap ${
                        index === currentStep ? 'text-cyan-300' : 'text-slate-500'
                      }`}>
                        <span className="hidden sm:inline">{step.title}</span>
                        <span className="sm:hidden">{step.title.split(' ')[0]}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mobile Swipeable Timeline */}
      {isMobile && (
        <motion.section 
          className="py-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="container mx-auto px-4">
            <SwipeableTimeline
              steps={timelineSteps}
              currentStep={currentStep}
              onStepChange={goToStep}
              completedSteps={completedSteps}
              isAutoPlaying={isAutoPlaying}
            />
          </div>
        </motion.section>
      )}

      {/* Main Content */}
      <motion.section 
        className="py-8 md:py-16 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
              drag={!isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              dragElastic={0.2}
            >
              
              {/* Step Information */}
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${currentStepData.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <div className={`${currentStepData.color} flex items-center justify-center`}>
                        <div className="w-6 h-6 sm:w-8 sm:h-8">
                          {currentStepData.icon}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2">
                        {currentStepData.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{currentStepData.duration}</span>
                        </div>
                        <span>•</span>
                        <span className={
                          currentStepData.difficulty === 'Easy' ? 'text-green-400' :
                          currentStepData.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                        }>{currentStepData.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-4 md:mb-6">
                    {currentStepData.description}
                  </p>
                  
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    {currentStepData.detailedDescription}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.button
                    onClick={previousStep}
                    disabled={currentStep === 0 || isAutoPlaying}
                    className="px-4 sm:px-6 py-3 bg-slate-700 text-white rounded-full font-semibold hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
                    whileHover={{ scale: currentStep === 0 || isAutoPlaying ? 1 : 1.05 }}
                    whileTap={{ scale: currentStep === 0 || isAutoPlaying ? 1 : 0.95 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous Step</span>
                    <span className="sm:hidden">Previous</span>
                  </motion.button>
                  <motion.button
                    onClick={nextStep}
                    disabled={currentStep === timelineSteps.length - 1 || isAutoPlaying}
                    className="px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                    whileHover={{ scale: currentStep === timelineSteps.length - 1 || isAutoPlaying ? 1 : 1.05 }}
                    whileTap={{ scale: currentStep === timelineSteps.length - 1 || isAutoPlaying ? 1 : 0.95 }}
                  >
                    <span className="hidden sm:inline">Next Step</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Visual Representation */}
              <motion.div 
                key={`visual-${currentStep}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative order-1 lg:order-2"
              >
                <div className="aspect-square max-w-sm sm:max-w-md mx-auto relative">
                  {/* Enhanced Tank Frame with Glass Effects */}
                  <div className="absolute inset-0 border-4 sm:border-6 md:border-8 border-slate-600 rounded-lg overflow-hidden shadow-2xl underwater-glow">
                    {/* Glass reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-200/10 to-transparent rounded-lg blur-sm" />
                    
                    {/* Stage Image Background */}
                    {!imageErrors[currentStepData.id] ? (
                      <motion.div
                        key={currentStepData.imageUrl}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Image
                          src={currentStepData.imageUrl}
                          alt={currentStepData.title}
                          fill
                          className="object-cover"
                          priority={currentStep <= 2}
                          onError={() => handleImageError(currentStepData.id)}
                          onLoadStart={() => handleImageLoadStart(currentStepData.id)}
                          onLoad={() => handleImageLoad(currentStepData.id)}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {imageLoading[currentStepData.id] && (
                          <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        className={`absolute inset-0 w-full h-full bg-gradient-to-br ${currentStepData.bgColor}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`text-6xl ${currentStepData.color}`}>
                            {currentStepData.icon}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Enhanced Underwater Overlay with Dynamic Effects */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-blue-800/40"></div>
                    
                    {/* Animated Light Caustics */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        backgroundImage: [
                          'radial-gradient(ellipse at 20% 30%, rgba(6, 182, 212, 0.2) 0%, transparent 40%)',
                          'radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.2) 0%, transparent 40%)',
                          'radial-gradient(ellipse at 20% 30%, rgba(6, 182, 212, 0.2) 0%, transparent 40%)'
                        ]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Water surface shimmer */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent aqua-shimmer" />
                    
                    {/* Bubbles during cycling */}
                    {currentStep >= 5 && (
                      <div className="absolute inset-0">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-cyan-300/40 rounded-full"
                            style={{
                              left: `${20 + (i * 10)}%`,
                              bottom: '20%'
                            }}
                            animate={{
                              y: [0, -200],
                              opacity: [0, 0.8, 0],
                              scale: [0.5, 1, 0.8]
                            }}
                            transition={{
                              duration: 4,
                              delay: i * 0.5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Step Progress Indicator */}
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-black/50 backdrop-blur-sm rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-semibold text-white">
                      {currentStep + 1}/{timelineSteps.length}
                    </div>
                  </div>
                </div>
                
                {/* Current Step Highlight */}
                <div className="mt-4 md:mt-6 text-center">
                  <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-2">
                    {currentStepData.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-300 px-2">
                    {currentStepData.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-12 md:py-24 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center glass-panel rounded-2xl p-6 md:p-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-4 md:mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 leading-relaxed">
              Transform your vision into a living aquatic masterpiece. 
              Get personalized guidance and premium supplies.
            </p>
            
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg w-full sm:w-auto min-h-[44px]"
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