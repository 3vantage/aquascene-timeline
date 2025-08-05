'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/animation-config';
import { StarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';

const TestimonialsSection: React.FC = () => {
  const t = useTranslations('testimonials');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Get testimonials from translations
  const testimonials = Array.from({ length: 3 }, (_, i) => ({
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    content: t(`items.${i}.content`),
    rating: parseInt(t(`items.${i}.rating`)),
  }));

  const additionalTestimonials = [
    {
      name: "Sophie Chen",
      role: "Aquascaping YouTuber",
      content: "The 3D visualization will completely change how I showcase aquascaping techniques to my audience. This is the future!",
      rating: 5,
    },
    {
      name: "Alex Petrov",
      role: "Aquarium Store Manager", 
      content: "Finally, a tool that helps customers understand the complexity and beauty of aquascaping before they start their journey.",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Beginner Aquascaper",
      content: "As someone new to aquascaping, having smart calculations and expert guidance in one place is incredibly valuable.",
      rating: 5,
    }
  ];

  const allTestimonials = [...testimonials, ...additionalTestimonials];

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
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      {/* Floating quote symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5
            }}
          >
            <ChatBubbleBottomCenterTextIcon className="w-full h-full" />
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
              <span className="text-sm font-medium text-white">Testimonials</span>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance">
              {t('title')}
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials.map((testimonial, index) => (
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
                  {/* Quote icon */}
                  <motion.div
                    className="absolute top-4 right-4 text-white/20"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.5
                    }}
                  >
                    <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
                  </motion.div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial content */}
                  <blockquote className="text-white/90 mb-6 italic leading-relaxed text-pretty">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-primary to-accent-emerald rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </motion.div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-white group-hover:text-accent-emerald transition-colors duration-300">
                        {testimonial.name}
                      </div>
                      <div className="text-white/70 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

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

          {/* Bottom stats */}
          <motion.div
            variants={staggerItem}
            className="mt-16 lg:mt-20 text-center"
          >
            <div className="glass-underwater p-8 rounded-2xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-4xl font-bold text-accent-emerald mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    98%
                  </motion.div>
                  <div className="text-white/80">Satisfaction Rate</div>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-4xl font-bold text-accent-emerald mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    2.5K+
                  </motion.div>
                  <div className="text-white/80">Early Adopters</div>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-4xl font-bold text-accent-emerald mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  >
                    12
                  </motion.div>
                  <div className="text-white/80">Countries</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;