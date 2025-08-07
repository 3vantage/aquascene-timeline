'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Hardcoded testimonials from the English translations
  const testimonials: TestimonialData[] = [
    {
      name: "Viktor Petrov",
      role: "Contest Winner • Sofia, Bulgaria",
      content: "Won 1st place at Bulgarian Aquascaping Championship using the 3D preview. Saved over 400 lev by knowing exactly what to buy.",
      rating: 5,
      location: "Sofia 🇧🇬",
      contest: "1st Place Winner"
    },
    {
      name: "Anna Kovács",
      role: "Aquascaping Enthusiast • Budapest",
      content: "My plants actually thrived for the first time! The regional growing conditions data was spot-on for Hungarian water.",
      rating: 5,
      location: "Budapest 🇭🇺",
      highlight: "90% plant survival rate"
    },
    {
      name: "Green Aqua Team",
      role: "Partner Store • Hungary",
      content: "Our customers are having 70% more success with their first tanks. This tool is a game-changer for beginners.",
      rating: 5,
      location: "Official Partner",
      stat: "70% higher success rate"
    },
    {
      name: "Dimitar Georgiev",
      role: "Pro Aquascaper • Plovdiv",
      content: "I can now design 5 tanks in the time it used to take for 1. My clients love seeing the 3D preview before we build.",
      rating: 5,
      location: "Plovdiv 🇧🇬",
      efficiency: "5x faster design process"
    }
  ];

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

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-dark/30 to-transparent" />
        
        {/* Floating bubble effects */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-cyan-400/20 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
            animate={{
              y: [0, -30, 0],
              scale: [0.5, 1, 0.3, 0.8, 0.5],
              opacity: [0.3, 0.8, 0.2, 0.6, 0.3]
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
              className="inline-flex items-center gap-2 glass-underwater px-6 py-3 rounded-full mb-6 border border-emerald-400/30"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-white tracking-wide">SUCCESS STORIES</span>
              <motion.div 
                className="w-2 h-2 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance">
              Real Results from Central European Aquascapers
            </h2>
            
            <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto text-pretty">
              See how local aquascapers are already winning contests and saving money
            </p>
          </motion.div>

          {/* Enhanced testimonials grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className="group"
              >
                <div className="glass-deep-water p-8 rounded-2xl h-full relative overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
                  {/* Enhanced background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  
                  {/* Quote decoration */}
                  <div className="absolute top-4 right-4 text-emerald-400/30 text-4xl font-serif">
                    "
                  </div>
                  
                  {/* Special badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {testimonial.contest && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 border border-yellow-400/40 rounded-full">
                        <TrophyIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-300">{testimonial.contest}</span>
                      </div>
                    )}
                    {testimonial.location && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full">
                        <MapPinIcon className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-300">{testimonial.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Star Rating with enhanced animation */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial content */}
                  <blockquote className="text-white/90 leading-relaxed text-pretty mb-6 relative z-10">
                    {testimonial.content}
                  </blockquote>

                  {/* Special metrics */}
                  {(testimonial.highlight || testimonial.stat || testimonial.efficiency) && (
                    <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/30">
                      <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold">
                        <SparklesIcon className="w-4 h-4" />
                        {testimonial.highlight || testimonial.stat || testimonial.efficiency}
                      </div>
                    </div>
                  )}

                  {/* Author info */}
                  <div className="flex items-center gap-4 mt-auto">
                    {/* Avatar with initials */}
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-white text-lg shadow-lg flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {testimonial.name.charAt(0)}
                    </motion.div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-white truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-emerald-200 text-sm truncate">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced border effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-emerald-400/0 group-hover:border-emerald-400/60 transition-colors duration-300 pointer-events-none"
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced bottom CTA */}
          <motion.div
            variants={staggerItem}
            className="text-center"
          >
            <div className="glass-underwater p-8 rounded-2xl max-w-4xl mx-auto border border-emerald-400/30">
              <h3 className="text-3xl font-bold text-white mb-4">
                Join These Successful Aquascapers
              </h3>
              <p className="text-emerald-100/80 mb-6 text-lg">
                Be part of Central Europe's most advanced aquascaping community and see real results like these.
              </p>
              
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
                Start Your Success Story
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;