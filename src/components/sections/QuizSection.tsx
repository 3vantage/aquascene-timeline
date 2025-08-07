'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/animation-config';
import { 
  SparklesIcon, 
  QuestionMarkCircleIcon,
  PlayCircleIcon,
  BeakerIcon,
  CubeTransparentIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';
import { AnimatePresence } from 'framer-motion';
import AquascapingQuiz from './AquascapingQuiz';

const QuizSection: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const aquascapeStyles = [
    { name: 'Nature Aquarium', icon: '🏔️', color: 'from-green-600 to-emerald-400' },
    { name: 'Dutch Style', icon: '🌈', color: 'from-red-500 to-yellow-400' },
    { name: 'Iwagumi', icon: '🎋', color: 'from-slate-600 to-stone-400' },
    { name: 'Jungle Style', icon: '🌺', color: 'from-green-800 to-lime-400' },
    { name: 'Biotope', icon: '🐟', color: 'from-blue-600 to-teal-400' },
    { name: 'Hardscape', icon: '🪨', color: 'from-stone-600 to-amber-600' }
  ];

  return (
    <>
      <section className="relative py-20 lg:py-32 overflow-hidden" ref={ref}>
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        
        {/* Floating question marks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-400/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 40 + 20}px`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 1.5
              }}
            >
              <QuestionMarkCircleIcon className="w-full h-full" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="max-w-7xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div variants={staggerItem} className="text-center lg:text-left">
                <motion.div
                  className="inline-flex items-center gap-2 glass-underwater px-6 py-3 rounded-full mb-8"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <SparklesIcon className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold text-white tracking-wide">DISCOVER YOUR STYLE</span>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                </motion.div>

                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance leading-tight">
                  <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                    What's Your
                  </span>
                  <br />
                  <span className="text-white">Aquascaping Style?</span>
                </h2>

                <p className="text-xl text-cyan-100/90 mb-8 max-w-xl mx-auto lg:mx-0 text-pretty leading-relaxed">
                  Take our 2-minute quiz to discover your perfect aquascaping style and get personalized recommendations for plants, layout, and difficulty level.
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-emerald-300">
                    <BeakerIcon className="w-5 h-5 flex-shrink-0" />
                    <span>5 quick questions about your preferences</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyan-300">
                    <CubeTransparentIcon className="w-5 h-5 flex-shrink-0" />
                    <span>Personalized plant and layout recommendations</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-300">
                    <PaintBrushIcon className="w-5 h-5 flex-shrink-0" />
                    <span>Shareable results with friends</span>
                  </div>
                </div>

                <motion.button
                  onClick={() => setShowQuiz(true)}
                  className="group bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto lg:mx-0"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlayCircleIcon className="w-6 h-6 group-hover:animate-pulse" />
                  Take the Quiz Now
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.button>

                <div className="mt-8 text-center lg:text-left">
                  <div className="text-sm text-cyan-200/80">
                    Join 2,500+ aquascapers who've discovered their style
                  </div>
                </div>
              </motion.div>

              {/* Right Visual - Style Preview */}
              <motion.div variants={staggerItem} className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {aquascapeStyles.map((style, index) => (
                    <motion.div
                      key={style.name}
                      className="group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="glass-underwater p-6 rounded-2xl border border-cyan-400/30 h-full transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                        <div className="text-center space-y-3">
                          <motion.div
                            className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${style.color} flex items-center justify-center text-3xl shadow-lg`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {style.icon}
                          </motion.div>
                          
                          <h3 className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors">
                            {style.name}
                          </h3>
                          
                          <motion.div
                            className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
                            initial={false}
                          >
                            <motion.div
                              className={`h-full bg-gradient-to-r ${style.color} rounded-full transform origin-left`}
                              initial={{ scaleX: 0 }}
                              animate={isInView ? { scaleX: 0.7 } : { scaleX: 0 }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Central quiz icon */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  <div className="w-20 h-20 glass-deep-water rounded-full border-2 border-cyan-400/50 flex items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors"
                    onClick={() => setShowQuiz(true)}
                  >
                    <QuestionMarkCircleIcon className="w-10 h-10 text-cyan-400" />
                  </div>
                </motion.div>

                {/* Connecting lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
                      style={{
                        height: '40%',
                        left: '50%',
                        top: '30%',
                        transformOrigin: 'bottom center',
                        transform: `rotate(${i * 60}deg)`
                      }}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Stats */}
            <motion.div
              variants={staggerItem}
              className="mt-20 text-center"
            >
              <div className="glass-underwater p-8 rounded-2xl border border-cyan-400/30 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      2.5K+
                    </motion.div>
                    <div className="text-white/90 font-medium">Quizzes Taken</div>
                    <div className="text-cyan-300 text-xs mt-1">This month</div>
                  </div>
                  
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                      6
                    </motion.div>
                    <div className="text-white/90 font-medium">Unique Styles</div>
                    <div className="text-emerald-300 text-xs mt-1">To discover</div>
                  </div>
                  
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                      92%
                    </motion.div>
                    <div className="text-white/90 font-medium">Accuracy Rate</div>
                    <div className="text-yellow-300 text-xs mt-1">User satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <AquascapingQuiz onClose={() => setShowQuiz(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default QuizSection;