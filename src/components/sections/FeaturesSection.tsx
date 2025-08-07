'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/animation-config';
import { 
  CubeIcon, 
  CalculatorIcon, 
  UsersIcon,
  SparklesIcon,
  BeakerIcon,
  LightBulbIcon,
  BuildingStorefrontIcon,
  TagIcon,
  UserGroupIcon as HandshakeIcon
} from '@heroicons/react/24/outline';

// Define interface for feature objects
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  benefit: string;
  color: string;
  delay: number;
  isPartnership?: boolean; // Optional partnership flag
}

const FeaturesSection: React.FC = () => {
  const t = useTranslations('features');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Check if user is in Hungarian locale for Green Aqua partnership
  const isHungarian = locale === 'hu';

  const baseFeatures: Feature[] = [
    {
      icon: CubeIcon,
      title: t('design.title'),
      description: t('design.description'),
      benefit: t('design.benefit'),
      color: 'from-cyan-500 to-emerald-500',
      delay: 0
    },
    {
      icon: CalculatorIcon,
      title: t('calculator.title'),
      description: t('calculator.description'),
      benefit: t('calculator.benefit'),
      color: 'from-emerald-500 to-green-500',
      delay: 0.2
    },
    {
      icon: UsersIcon,
      title: t('community.title'),
      description: t('community.description'),
      benefit: t('community.benefit'),
      color: 'from-blue-500 to-cyan-500',
      delay: 0.4
    }
  ];

  // Add Green Aqua feature for Hungarian users
  const features: Feature[] = isHungarian ? [
    ...baseFeatures,
    {
      icon: HandshakeIcon,
      title: t('greenaqua.title'),
      description: t('greenaqua.description'),
      benefit: t('greenaqua.benefit'),
      color: 'from-orange-500 to-red-500',
      delay: 0.6,
      isPartnership: true
    }
  ] : baseFeatures;

  const floatingIcons = [
    { icon: SparklesIcon, x: '10%', y: '20%', delay: 0 },
    { icon: BeakerIcon, x: '85%', y: '15%', delay: 2 },
    { icon: LightBulbIcon, x: '15%', y: '80%', delay: 4 },
    { icon: CubeIcon, x: '90%', y: '75%', delay: 1.5 },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent" />
      
      {/* Floating background icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8 text-emerald-500/10"
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
          {/* Enhanced section header */}
          <motion.div
            variants={staggerItem}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 glass-underwater px-6 py-3 rounded-full mb-6 border border-cyan-400/30"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <SparklesIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-white tracking-wide">WHY CHOOSE US</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance">
              {t('title')}
            </h2>
            
            <p className="text-xl text-cyan-100/80 max-w-3xl mx-auto text-pretty">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Enhanced features grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className="group"
              >
                <div className={`glass-deep-water p-8 rounded-2xl h-full relative overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  feature.isPartnership ? 'border-2 border-orange-400/50 hover:border-orange-400/70' : 'border border-emerald-500/20 hover:border-emerald-500/40'
                }`}>
                  {/* Partnership badge */}
                  {feature.isPartnership && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-orange-500/20 rounded-full border border-orange-400/50">
                      <HandshakeIcon className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-semibold text-orange-300">PARTNER</span>
                    </div>
                  )}
                  
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    initial={false}
                  />
                  
                  {/* Enhanced icon container */}
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 relative shadow-lg`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: feature.isPartnership ? [0, 5, -5, 0] : 5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                    
                    {/* Enhanced icon glow effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl -z-10`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: feature.delay
                      }}
                    />
                  </motion.div>

                  <h3 className={`text-2xl font-bold text-white mb-3 group-hover:${feature.isPartnership ? 'text-orange-300' : 'text-emerald-300'} transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed text-pretty mb-4">
                    {feature.description}
                  </p>

                  {/* Benefit highlight */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                    feature.isPartnership ? 'bg-orange-500/20 border border-orange-400/30' : 'bg-emerald-500/20 border border-emerald-400/30'
                  }`}>
                    <TagIcon className={`w-4 h-4 ${feature.isPartnership ? 'text-orange-400' : 'text-emerald-400'}`} />
                    <span className={`text-sm font-semibold ${feature.isPartnership ? 'text-orange-300' : 'text-emerald-300'}`}>
                      {feature.benefit}
                    </span>
                  </div>

                  {/* Enhanced hover effects */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl border-2 ${
                      feature.isPartnership 
                        ? 'border-orange-400/0 group-hover:border-orange-400/60' 
                        : 'border-emerald-400/0 group-hover:border-emerald-400/60'
                    } transition-colors duration-300 pointer-events-none`}
                    initial={false}
                  />

                  {/* Caustic water effect on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                      feature.isPartnership ? 'via-orange-400/10' : 'via-emerald-400/10'
                    } to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none`}
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Regional partnership showcase for Hungarian users */}
          {isHungarian && (
            <motion.div
              variants={staggerItem}
              className="mt-16 lg:mt-20"
            >
              <div className="glass-underwater p-8 rounded-2xl border border-orange-400/30 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="text-3xl">🤝</span>
                    <h3 className="text-2xl font-bold text-white">Official Green Aqua Partnership</h3>
                    <span className="text-3xl">🇭🇺</span>
                  </div>
                  <p className="text-orange-200 text-lg">
                    Exclusive benefits for Hungarian aquascapers through Europe's leading aquascaping store
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-xl bg-orange-500/10 border border-orange-400/30">
                    <TagIcon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <h4 className="text-white font-semibold mb-2">15% Discount</h4>
                    <p className="text-orange-200 text-sm">On your first Green Aqua order</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-orange-500/10 border border-orange-400/30">
                    <BuildingStorefrontIcon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <h4 className="text-white font-semibold mb-2">Priority Access</h4>
                    <p className="text-orange-200 text-sm">To new plants and products</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-orange-500/10 border border-orange-400/30">
                    <UsersIcon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <h4 className="text-white font-semibold mb-2">Expert Support</h4>
                    <p className="text-orange-200 text-sm">Direct line to Green Aqua team</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced bottom CTA section */}
          <motion.div
            variants={staggerItem}
            className="text-center mt-16 lg:mt-20"
          >
            <div className="glass-underwater p-8 rounded-2xl max-w-3xl mx-auto border border-cyan-400/30">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Stop Wasting Money on Failed Aquascapes?
              </h3>
              <p className="text-cyan-100/80 mb-6 text-lg">
                Join 2,500+ smart aquascapers who design with confidence and save 60% on plant costs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const waitlistSection = document.getElementById('waitlist');
                    waitlistSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <SparklesIcon className="w-5 h-5" />
                  Start Designing Now
                </motion.button>

                {isHungarian && (
                  <div className="flex items-center gap-2 text-orange-300 text-sm">
                    <TagIcon className="w-4 h-4" />
                    <span>+ 15% Green Aqua discount included</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;