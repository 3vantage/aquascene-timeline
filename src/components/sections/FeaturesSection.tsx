'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/animation-config';
import { 
  CubeIcon, 
  CalculatorIcon, 
  UsersIcon,
  SparklesIcon,
  BeakerIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const FeaturesSection: React.FC = () => {
  const t = useTranslations('features');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: CubeIcon,
      title: t('design.title'),
      description: t('design.description'),
      color: 'from-primary to-accent-emerald',
      delay: 0
    },
    {
      icon: CalculatorIcon,
      title: t('calculator.title'),
      description: t('calculator.description'),
      color: 'from-secondary to-accent',
      delay: 0.2
    },
    {
      icon: UsersIcon,
      title: t('community.title'),
      description: t('community.description'),
      color: 'from-accent-coral to-accent-light',
      delay: 0.4
    }
  ];

  const floatingIcons = [
    { icon: SparklesIcon, x: '10%', y: '20%', delay: 0 },
    { icon: BeakerIcon, x: '85%', y: '15%', delay: 2 },
    { icon: LightBulbIcon, x: '15%', y: '80%', delay: 4 },
    { icon: CubeIcon, x: '90%', y: '75%', delay: 1.5 },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      {/* Floating background icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8 text-primary/10"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay
          }}
        >
          <item.icon className="w-full h-full" />
        </motion.div>
      ))}

      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <motion.div
            variants={staggerItem}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 glass-underwater px-4 py-2 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <SparklesIcon className="w-4 h-4 text-accent-emerald" />
              <span className="text-sm font-medium text-white">Features</span>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance">
              {t('title')}
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className="group"
              >
                <div className="glass-deep-water p-8 rounded-2xl h-full relative overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    initial={false}
                  />
                  
                  {/* Icon container */}
                  <motion.div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 relative`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                    
                    {/* Icon glow effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-xl -z-10`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: feature.delay
                      }}
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-emerald transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed text-pretty">
                    {feature.description}
                  </p>

                  {/* Hover effect border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-accent-emerald/0 group-hover:border-accent-emerald/50 transition-colors duration-300 pointer-events-none"
                    initial={false}
                  />

                  {/* Water ripple effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA section */}
          <motion.div
            variants={staggerItem}
            className="text-center mt-16 lg:mt-20"
          >
            <div className="glass-underwater p-8 rounded-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Aquascaping?
              </h3>
              <p className="text-white/80 mb-6">
                Join thousands of aquascapers who are already revolutionizing their craft with our professional tools.
              </p>
              <motion.button
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-emerald to-primary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const waitlistSection = document.getElementById('waitlist');
                  waitlistSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <SparklesIcon className="w-5 h-5" />
                Get Early Access
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;