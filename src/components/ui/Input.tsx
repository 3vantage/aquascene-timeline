'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AnimationManager, fieldFocus, fieldError } from '@/lib/animation-config';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'glass' | 'underwater';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  fullWidth = true,
  className,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const animationManager = AnimationManager.getInstance();
  const config = animationManager.getAnimationConfig();

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const containerClasses = clsx(
    'relative',
    {
      'w-full': fullWidth,
    }
  );

  const inputWrapperClasses = clsx(
    'relative flex items-center transition-all duration-200',
    'border-2 rounded-lg overflow-hidden',
    {
      // Default variant
      'bg-white border-neutral-300 focus-within:border-primary focus-within:shadow-md': 
        variant === 'default' && !error,
      'bg-white border-error focus-within:border-error focus-within:shadow-lg focus-within:shadow-error/20': 
        variant === 'default' && error,
      
      // Glass variant
      'glass-underwater border-white/20 focus-within:border-accent-emerald/50': 
        variant === 'glass' && !error,
      'glass-underwater border-error/50 focus-within:border-error': 
        variant === 'glass' && error,
      
      // Underwater variant
      'glass-deep-water border-primary/30 focus-within:border-accent-emerald': 
        variant === 'underwater' && !error,
      'glass-deep-water border-error/50 focus-within:border-error': 
        variant === 'underwater' && error,
        
      'opacity-60 cursor-not-allowed': disabled,
    }
  );

  const inputClasses = clsx(
    'flex-1 px-4 py-3 text-base bg-transparent border-0 outline-none placeholder-transparent',
    'disabled:cursor-not-allowed',
    {
      'text-neutral-900': variant === 'default',
      'text-white placeholder-white/50': variant === 'glass' || variant === 'underwater',
      'pl-12': leftIcon,
      'pr-12': rightIcon,
    }
  );

  const labelClasses = clsx(
    'absolute left-4 transition-all duration-200 pointer-events-none',
    {
      'text-neutral-500': variant === 'default' && !error && !isFocused,
      'text-primary': variant === 'default' && !error && isFocused,
      'text-error': error,
      'text-white/70': (variant === 'glass' || variant === 'underwater') && !error && !isFocused,
      'text-accent-emerald': (variant === 'glass' || variant === 'underwater') && !error && isFocused,
      // Label positioning
      'top-3 text-base': !isFocused && !hasValue,
      'top-1 text-sm scale-90 origin-left': isFocused || hasValue,
      'left-12': leftIcon && (!isFocused && !hasValue),
    }
  );

  const motionProps = config.enabled ? {
    animate: error ? fieldError : (isFocused ? fieldFocus : { scale: 1 }),
    transition: { duration: 0.2, ease: 'easeOut' }
  } : {};

  return (
    <div className={containerClasses}>
      <motion.div
        className={inputWrapperClasses}
        {...motionProps}
      >
        {/* Left icon */}
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none">
            <div className={clsx(
              'w-5 h-5',
              {
                'text-neutral-400': variant === 'default' && !isFocused && !error,
                'text-primary': variant === 'default' && isFocused && !error,
                'text-error': error,
                'text-white/50': (variant === 'glass' || variant === 'underwater') && !isFocused && !error,
                'text-accent-emerald': (variant === 'glass' || variant === 'underwater') && isFocused && !error,
              }
            )}>
              {leftIcon}
            </div>
          </div>
        )}

        {/* Input field */}
        <input
          ref={ref}
          className={clsx(inputClasses, className)}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        />

        {/* Animated label */}
        {label && (
          <motion.label
            className={labelClasses}
            animate={isFocused || hasValue ? {
              y: -12,
              scale: 0.85,
            } : {
              y: 0,
              scale: 1,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {label}
          </motion.label>
        )}

        {/* Right icon */}
        {rightIcon && (
          <div className="absolute right-3 flex items-center pointer-events-none">
            <div className={clsx(
              'w-5 h-5',
              {
                'text-neutral-400': variant === 'default' && !isFocused && !error,
                'text-primary': variant === 'default' && isFocused && !error,
                'text-error': error,
                'text-white/50': (variant === 'glass' || variant === 'underwater') && !isFocused && !error,
                'text-accent-emerald': (variant === 'glass' || variant === 'underwater') && isFocused && !error,
              }
            )}>
              {rightIcon}
            </div>
          </div>
        )}

        {/* Focus border animation */}
        {config.enabled && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent-emerald"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isFocused ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}

        {/* Water ripple effect on focus */}
        <AnimatePresence>
          {isFocused && config.enabled && !error && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent-emerald/10 pointer-events-none"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Helper text and error messages */}
      <AnimatePresence>
        {(error || helperText) && (
          <motion.div
            className="mt-2 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error ? (
              <span className="text-error flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </span>
            ) : (
              <span className={clsx(
                {
                  'text-neutral-500': variant === 'default',
                  'text-white/70': variant === 'glass' || variant === 'underwater',
                }
              )}>
                {helperText}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;