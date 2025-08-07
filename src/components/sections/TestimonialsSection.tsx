'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/animation-config';
import { StarIcon, ChatBubbleBottomCenterTextIcon, TrophyIcon } from '@heroicons/react/24/solid';
import { SparklesIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface TestimonialData {
  name: string;
  role: string;
  content: string;
  rating: number;
  location?: string;
  contest?: string;
  highlight?: string;
  stat?: string;
  efficiency?: string;
}

const TestimonialsSection: React.FC = () => {
  const t = useTranslations('testimonials');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Get testimonials from translations with enhanced data structure
  const testimonials: TestimonialData[] = Array.from({ length: 4 }, (_, i) => {
    const testimonial: TestimonialData = {
      name: t(`items.${i}.name`),
      role: t(`items.${i}.role`),
      content: t(`items.${i}.content`),
      rating: parseInt(t(`items.${i}.rating`)),
    };

    // Try to get additional properties that might exist
    try {
      const location = t(`items.${i}.location`);
      if (location) testimonial.location = location;
    } catch {}
    
    try {
      const contest = t(`items.${i}.contest`);
      if (contest) testimonial.contest = contest;
    } catch {}
    
    try {
      const highlight = t(`items.${i}.highlight`);
      if (highlight) testimonial.highlight = highlight;
    } catch {}
    
    try {
      const stat = t(`items.${i}.stat`);
      if (stat) testimonial.stat = stat;
    } catch {}
    
    try {
      const efficiency = t(`items.${i}.efficiency`);
      if (efficiency) testimonial.efficiency = efficiency;
    } catch {}

    return testimonial;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ 
          duration: 0.3, 
          delay: 0.5 + i * 0.1,
          type: "spring",
          stiffness: 200 
        }}
      >
        <StarIcon 
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-white/20'}`}
        />
      </motion.div>
    ));
  };

  const getLocationFlag = (location: string) => {
    if (location?.includes('🇧🇬')) return '🇧🇬';
    if (location?.includes('🇭🇺')) return '🇭🇺';
    return '🏆';
  };

  const getSpecialBadge = (testimonial: TestimonialData) => {
    if (testimonial.contest) return { icon: TrophyIcon, text: testimonial.contest, color: 'text-yellow-400' };
    if (testimonial.highlight) return { icon: SparklesIcon, text: testimonial.highlight, color: 'text-emerald-400' };
    if (testimonial.stat) return { icon: TrophyIcon, text: testimonial.stat, color: 'text-cyan-400' };
    if (testimonial.efficiency) return { icon: SparklesIcon, text: testimonial.efficiency, color: 'text-green-400' };
    return null;
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent" />
      
      {/* Floating success icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-emerald-500/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 15}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2
            }}
          >
            {i % 2 === 0 ? (
              <TrophyIcon className="w-full h-full" />
            ) : (
              <SparklesIcon className="w-full h-full" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
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
              className="inline-flex items-center gap-2 glass-emerald px-6 py-3 rounded-full mb-6 border border-emerald-400/30"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <TrophyIcon className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-white tracking-wide">SUCCESS STORIES</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance">
              {t('title')}
            </h2>
            
            <p className="text-xl text-cyan-100/80 max-w-3xl mx-auto text-pretty">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Enhanced testimonials grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => {
              const specialBadge = getSpecialBadge(testimonial);
              
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  className="group"
                >
                  <div className="glass-deep-water p-8 rounded-2xl h-full relative overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 border border-emerald-500/20">
                    {/* Location flag */}
                    {testimonial.location && (
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="text-2xl">{getLocationFlag(testimonial.location)}</span>
                        <span className="text-xs text-emerald-300 font-medium">
                          {testimonial.location.replace(/🇧🇬|🇭🇺/, '').trim()}
                        </span>
                      </div>
                    )}

                    {/* Special badge */}
                    {specialBadge && (
                      <motion.div
                        className={`flex items-center gap-2 mb-4 p-2 rounded-lg bg-black/30 border border-emerald-400/30 w-fit`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <specialBadge.icon className={`w-4 h-4 ${specialBadge.color}`} />
                        <span className={`text-xs font-semibold ${specialBadge.color}`}>
                          {specialBadge.text}
                        </span>
                      </motion.div>
                    )}

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial content */}
                    <blockquote className="text-white/90 mb-6 italic leading-relaxed text-pretty text-lg">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    {/* Author info */}
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </motion.div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-white text-lg group-hover:text-emerald-300 transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-cyan-200 text-sm font-medium">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced hover effects */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-all duration-300 pointer-events-none"
                      initial={false}
                    />

                    {/* Caustic light effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                      initial={false}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced regional success stats */}
          <motion.div
            variants={staggerItem}
            className="text-center"
          >
            <div className="glass-underwater p-8 rounded-2xl max-w-5xl mx-auto border border-cyan-400/30">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <motion.div
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    97%
                  </motion.div>
                  <div className="text-white/90 font-medium">Success Rate</div>
                  <div className="text-emerald-300 text-xs mt-1">First tank builds</div>
                </motion.div>
                
                <motion.div
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    2.5K+
                  </motion.div>
                  <div className="text-white/90 font-medium">Bulgarian & Hungarian</div>
                  <div className="text-cyan-300 text-xs mt-1">Aquascapers waiting</div>
                </motion.div>
                
                <motion.div
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  >
                    23
                  </motion.div>
                  <div className="text-white/90 font-medium">Contest Winners</div>
                  <div className="text-yellow-300 text-xs mt-1">Using our platform</div>
                </motion.div>

                <motion.div
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  >
                    65%
                  </motion.div>
                  <div className="text-white/90 font-medium">Cost Savings</div>
                  <div className="text-green-300 text-xs mt-1">Vs. trial & error</div>
                </motion.div>
              </div>
              
              {/* Regional partnership badge */}
              <motion.div
                className="mt-8 flex items-center justify-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-400/30"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  <span className="text-emerald-300 font-semibold">Official Green Aqua Partner</span>
                </div>
                <div className="w-1 h-8 bg-cyan-400/50 rounded-full" />
                <div className="text-cyan-200 text-sm">
                  Exclusive discounts for Hungarian aquascapers
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;