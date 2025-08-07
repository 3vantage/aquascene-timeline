'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import WaitlistForm from '@/components/forms/WaitlistForm';
import { staggerContainer, staggerItem } from '@/lib/animation-config';
import { SparklesIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const WaitlistSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    {
      icon: UserGroupIcon,
      value: '2,500+',
      label: 'Early Adopters',
      color: 'from-primary to-accent-emerald'
    },
    {
      icon: GlobeAltIcon,
      value: '12',
      label: 'Countries',
      color: 'from-secondary to-accent'
    },
    {
      icon: SparklesIcon,
      value: '98%',
      label: 'Satisfaction Rate',
      color: 'from-accent-coral to-accent-light'
    }
  ];

  return (
    <section id="waitlist" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark/20 via-primary/30 to-secondary-dark/20" />
      
      {/* Animated water current effect */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%'],
            skewX: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="max-w-7xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left side - Content */}
            <div className="lg:sticky lg:top-8">
              <motion.div variants={staggerItem}>
                <div className="inline-flex items-center gap-2 glass-underwater px-4 py-2 rounded-full mb-6">
                  <SparklesIcon className="w-4 h-4 text-accent-emerald" />
                  <span className="text-sm font-medium text-white">Join the Waitlist</span>
                </div>
              </motion.div>

              <motion.h2
                variants={staggerItem}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance"
              >
                Join 2,500+ Smart Aquascapers
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-white/80 mb-8 text-pretty"
              >
                Stop guessing. Start designing with confidence.
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-3 gap-6 mb-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="glass-underwater p-4 rounded-xl mb-3 hover:shadow-lg transition-shadow duration-300">
                      <motion.div
                        className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.5
                        }}
                      >
                        <stat.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Benefits list */}
              <motion.div variants={staggerItem} className="space-y-4">
                {[
                  'Priority access to beta features',
                  'Exclusive aquascaping guides and tips',
                  'Direct feedback channel to our team',
                  'Special launch pricing discounts'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-emerald to-primary rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social proof */}
              <motion.div
                variants={staggerItem}
                className="mt-8 p-6 glass-underwater rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-emerald border-2 border-white/50 flex items-center justify-center"
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.2
                        }}
                      >
                        <span className="text-white text-xs font-medium">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    <div className="text-white font-medium">Join the Community</div>
                    <div className="text-white/70 text-sm">2,500+ aquascapers already signed up</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Form */}
            <motion.div variants={staggerItem} className="lg:pt-16">
              <WaitlistForm />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-accent-emerald/10 to-primary/10 blur-xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default WaitlistSection;