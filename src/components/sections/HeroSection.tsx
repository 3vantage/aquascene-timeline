'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animation-config';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

const HeroSection: React.FC = () => {
  const t = useTranslations('hero');

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    waitlistSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-light/30 via-primary/20 to-secondary-dark/40" />
      
      {/* Animated light rays */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 bg-gradient-to-b from-white/20 via-accent-light/10 to-transparent"
            style={{
              height: '100vh',
              left: `${20 + i * 15}%`,
              transformOrigin: 'top center',
            }}
            animate={{
              rotate: [0, 2, -1, 3, 0],
              opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div
                variants={staggerItem}
                className="flex items-center justify-center lg:justify-start mb-6"
              >
                <div className="glass-underwater px-4 py-2 rounded-full flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-accent-emerald" />
                  <span className="text-sm font-medium text-white">
                    {t('badge')}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <span className="block text-balance">
                  {t('title')}
                </span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 text-pretty"
              >
                {t('subtitle')}
              </motion.p>

              <motion.p
                variants={staggerItem}
                className="text-lg text-white/80 mb-10 max-w-xl mx-auto lg:mx-0"
              >
                {t('description')}
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="xl"
                  onClick={scrollToWaitlist}
                  rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                  className="shadow-2xl hover:shadow-emerald/50"
                >
                  {t('cta')}
                </Button>
                
                <Button
                  variant="secondary"
                  size="xl"
                  className="glass-underwater border-white/30 text-white hover:bg-white/10"
                >
                  {t('secondaryCta')}
                </Button>
              </motion.div>

              {/* Trust indicator */}
              <motion.div
                variants={staggerItem}
                className="mt-12 flex items-center justify-center lg:justify-start gap-3"
              >
                <div className="flex -space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-emerald border-2 border-white/50 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                    >
                      <span className="text-white text-xs font-medium">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="text-white/80 text-sm">
                  {t('trustedBy', { count: '2,500' })}
                </div>
              </motion.div>
            </div>

            {/* Right Visual */}
            <motion.div
              variants={staggerItem}
              className="relative"
            >
              {/* Main aquarium visualization */}
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Glass container effect */}
                <motion.div
                  className="glass-deep-water rounded-3xl p-8 relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      '0 25px 50px rgba(45, 90, 61, 0.3)',
                      '0 35px 70px rgba(45, 90, 61, 0.4)',
                      '0 25px 50px rgba(45, 90, 61, 0.3)',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Animated aquascape elements */}
                  <div className="relative h-full">
                    {/* Substrate/bottom */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-600/50 to-transparent rounded-b-2xl"
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    {/* Plants */}
                    <motion.div
                      className="absolute bottom-16 left-8 w-4 h-24 bg-gradient-to-t from-primary to-accent-light rounded-t-full"
                      animate={{
                        rotate: [0, 2, -1, 3, 0],
                        scaleY: [1, 1.1, 0.9, 1.05, 1]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    
                    <motion.div
                      className="absolute bottom-16 right-12 w-3 h-20 bg-gradient-to-t from-accent to-accent-light rounded-t-full"
                      animate={{
                        rotate: [0, -2, 1, -3, 0],
                        scaleY: [1, 0.9, 1.1, 0.95, 1]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    
                    {/* Animated fish */}
                    <motion.div
                      className="absolute w-6 h-3 bg-accent-coral rounded-full"
                      animate={{
                        x: [20, 200, 100, 250, 20],
                        y: [80, 60, 120, 40, 80],
                        rotate: [0, 15, -10, 20, 0]
                      }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="absolute right-0 top-1/2 w-2 h-2 bg-accent-coral transform -translate-y-1/2 rounded-l-full" />
                    </motion.div>
                    
                    <motion.div
                      className="absolute w-4 h-2 bg-secondary-light rounded-full"
                      animate={{
                        x: [300, 50, 180, 20, 300],
                        y: [100, 140, 60, 110, 100],
                        rotate: [180, 200, 160, 190, 180]
                      }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 2 }}
                    >
                      <div className="absolute left-0 top-1/2 w-1 h-1 bg-secondary-light transform -translate-y-1/2 rounded-r-full" />
                    </motion.div>
                    
                    {/* Water surface effect */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>

                {/* Floating UI elements */}
                <motion.div
                  className="absolute -top-4 -right-4 glass-effect p-3 rounded-xl"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="text-white text-xs font-medium">3D Design</div>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 glass-effect p-3 rounded-xl"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <div className="text-white text-xs font-medium">Smart Calc</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="glass-underwater p-3 rounded-full">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;