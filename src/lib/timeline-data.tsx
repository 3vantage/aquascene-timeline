import { TimelineStep } from '@/types/timeline'
import { 
  Settings, 
  Mountain, 
  Droplets, 
  Leaf, 
  Fish, 
  Sparkles,
  Clock,
  CheckCircle
} from 'lucide-react'
import React from 'react'

export const timelineSteps: TimelineStep[] = [
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
    products: ['rimless-tank-60cm', 'led-lighting-system', 'canister-filter'],
    tips: [
      'Choose a location away from direct sunlight',
      'Ensure the surface can support the weight',
      'Check all equipment before starting',
      'Have cleaning supplies ready'
    ],
    warnings: [
      'Never use soap or detergents on aquarium equipment',
      'Ensure electrical safety around water'
    ],
    imageUrl: '/images/tank-setup.jpg'
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
    products: ['dragon-stone', 'spider-wood', 'lava-rock'],
    tips: [
      'Follow the rule of thirds for placement',
      'Create odd numbers of groupings',
      'Leave space for plant growth',
      'Consider swimming pathways for fish'
    ],
    warnings: [
      'Some stones may affect water pH',
      'Rinse all hardscape materials thoroughly'
    ],
    imageUrl: '/images/hardscape.jpg'
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
    products: ['ada-aqua-soil', 'substrate-spatula', 'fine-tweezers'],
    tips: [
      'Slope substrate higher in the back',
      'Use 2-3 inches depth minimum',
      'Create valleys and hills for interest',
      'Pack gently around hardscape'
    ],
    warnings: [
      'Some substrates will cloud water initially',
      'Avoid disturbing substrate when adding water'
    ],
    imageUrl: '/images/substrate.jpg'
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
    products: ['monte-carlo', 'anubias-nana', 'rotala-rotundifolia', 'java-moss'],
    tips: [
      'Plant carpeting plants in small portions',
      'Trim roots to 2-3cm before planting',
      'Create natural groupings',
      'Leave space for growth between plants'
    ],
    warnings: [
      'Handle delicate plants with tweezers',
      'Some plants need attachment to hardscape'
    ],
    imageUrl: '/images/planting.jpg'
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
    products: ['plastic-wrap', 'fine-spray-bottle', 'siphon-tube'],
    tips: [
      'Pour water onto plastic wrap or plate',
      'Fill very slowly to minimize disturbance',
      'Use room temperature water',
      'Expect some initial cloudiness'
    ],
    warnings: [
      'Too fast filling will uproot plants',
      'Chlorinated water needs dechlorination'
    ],
    imageUrl: '/images/flooding.jpg'
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
    products: ['liquid-fertilizer', 'co2-system', 'test-kit', 'beneficial-bacteria'],
    tips: [
      'Test water parameters weekly',
      'Add liquid fertilizer daily',
      'Maintain consistent lighting schedule',
      'Trim plants as needed'
    ],
    warnings: [
      'Ammonia and nitrite spikes are normal initially',
      'Don\'t add fish until cycle completes'
    ],
    imageUrl: '/images/cycling.jpg'
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
    products: ['neon-tetras', 'cherry-shrimp', 'amano-shrimp', 'fish-food'],
    tips: [
      'Acclimate new fish properly',
      'Start with small, peaceful species',
      'Feed sparingly at first',
      'Monitor behavior closely'
    ],
    warnings: [
      'Quarantine new additions if possible',
      'Don\'t overstock the tank'
    ],
    imageUrl: '/images/fish.jpg'
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
    products: ['maintenance-tools', 'algae-scraper', 'water-conditioner'],
    tips: [
      'Maintain regular water changes',
      'Trim plants weekly',
      'Clean filter monthly',
      'Enjoy your creation!'
    ],
    warnings: [
      'Watch for algae outbreaks',
      'Don\'t neglect regular maintenance'
    ],
    imageUrl: '/images/mature.jpg'
  }
]

export const defaultTimelineState = {
  currentStep: 0,
  isAutoPlaying: false,
  playSpeed: 3000,
  completedSteps: [],
  viewMode: 'desktop' as const,
  animationState: 'idle' as const,
  showDetails: false
}

export const animationPresets = {
  gentle: {
    duration: 0.8,
    delay: 0.1,
    ease: "easeOut"
  },
  bouncy: {
    duration: 1.2,
    delay: 0.2,
    ease: "backOut"
  },
  smooth: {
    duration: 0.6,
    delay: 0,
    ease: "easeInOut"
  }
}