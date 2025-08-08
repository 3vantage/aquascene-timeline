import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(duration: string): string {
  // Convert duration strings to a more readable format
  const durationMap: Record<string, string> = {
    '1-2 hours': '1-2 hrs',
    '2-4 hours': '2-4 hrs',
    '30-45 minutes': '30-45 min',
    '45-60 minutes': '45-60 min',
    '1-3 hours': '1-3 hrs',
    '4-6 weeks': '4-6 weeks',
    '1-2 weeks': '1-2 weeks',
    'Ongoing': 'Ongoing'
  }
  
  return durationMap[duration] || duration
}

export function getDifficultyColor(difficulty: 'Easy' | 'Medium' | 'Hard'): string {
  const colors = {
    Easy: 'text-green-400',
    Medium: 'text-yellow-400',
    Hard: 'text-red-400'
  }
  
  return colors[difficulty] || 'text-slate-400'
}

export function getDifficultyBadgeClasses(difficulty: 'Easy' | 'Medium' | 'Hard'): string {
  const classes = {
    Easy: 'bg-green-500/20 text-green-300 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Hard: 'bg-red-500/20 text-red-300 border-red-500/30'
  }
  
  return classes[difficulty] || 'bg-slate-500/20 text-slate-300 border-slate-500/30'
}

export function generateBubbles(count: number = 8) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 80 + 10, // 10-90% from left
    y: Math.random() * 60 + 20, // 20-80% from top
    size: Math.random() * 0.5 + 0.5, // 0.5-1x size
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 3 // 3-5 seconds
  }))
}

export function generateParticles(count: number = 12) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 80 + 10,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.3,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }))
}

export function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
}

export function easeOutBack(t: number): number {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function getRandomColor(colors: string[]): string {
  return colors[Math.floor(Math.random() * colors.length)]
}

export function interpolateColor(color1: string, color2: string, factor: number): string {
  // Simple color interpolation (would need a proper color library for production)
  return factor < 0.5 ? color1 : color2
}

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function getViewportSize(): 'mobile' | 'tablet' | 'desktop' | 'wide' {
  if (typeof window === 'undefined') return 'desktop'
  
  const width = window.innerWidth
  
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  if (width < 1400) return 'desktop'
  return 'wide'
}

export function smoothScrollTo(element: HTMLElement | null, options?: ScrollIntoViewOptions) {
  if (!element) return
  
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    ...options
  })
}

export function formatStepId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function calculateProgress(currentStep: number, totalSteps: number): number {
  return Math.round((currentStep / (totalSteps - 1)) * 100)
}

export function getNextStep(currentStep: number, totalSteps: number): number | null {
  return currentStep < totalSteps - 1 ? currentStep + 1 : null
}

export function getPreviousStep(currentStep: number): number | null {
  return currentStep > 0 ? currentStep - 1 : null
}

export function validateStepIndex(step: number, totalSteps: number): boolean {
  return step >= 0 && step < totalSteps
}

export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
}