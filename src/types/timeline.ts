export interface TimelineStep {
  id: string
  title: string
  description: string
  detailedDescription?: string
  icon: React.ReactNode
  duration: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  color: string
  bgColor: string
  products: string[]
  tips: string[]
  warnings?: string[]
  imageUrl?: string
  videoUrl?: string
}

export interface TimelineState {
  currentStep: number
  isAutoPlaying: boolean
  playSpeed: number
  completedSteps: number[]
  viewMode: 'desktop' | 'mobile'
  animationState: 'idle' | 'transitioning' | 'playing'
  showDetails: boolean
}

export interface AnimationConfig {
  duration: number
  delay: number
  ease: string
  stagger?: number
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  currency: string
  image?: string
  description?: string
  brand?: string
  inStock: boolean
}

export interface TimelineControls {
  play: () => void
  pause: () => void
  reset: () => void
  goToStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  setPlaySpeed: (speed: number) => void
}

export interface ParticleConfig {
  count: number
  speed: number
  size: { min: number; max: number }
  opacity: { min: number; max: number }
  color: string[]
}

export interface VisualEffects {
  bubbles: boolean
  particles: boolean
  caustics: boolean
  lighting: boolean
}

export type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'wide'

export interface ResponsiveConfig {
  breakpoints: Record<ViewportSize, number>
  currentBreakpoint: ViewportSize
}

export interface GestureConfig {
  swipeThreshold: number
  velocityThreshold: number
  enableTouch: boolean
  enableMouse: boolean
}

export interface AccessibilityConfig {
  reduceMotion: boolean
  highContrast: boolean
  screenReaderMode: boolean
  keyboardNavigation: boolean
}