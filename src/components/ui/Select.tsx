'use client';

import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AnimationManager, fieldFocus, fieldError } from '@/lib/animation-config';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  variant?: 'default' | 'glass' | 'underwater';
  fullWidth?: boolean;
  required?: boolean;
  name?: string;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(({
  label,
  placeholder = 'Select an option...',
  options,
  value,
  onChange,
  error,
  disabled = false,
  variant = 'default',
  fullWidth = true,
  required = false,
  name,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const animationManager = AnimationManager.getInstance();
  const config = animationManager.getAnimationConfig();

  const selectedOption = options.find(option => option.value === value);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    
    // Haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Close dropdown on blur with a small delay to allow for option selection
    setTimeout(() => setIsOpen(false), 150);
  };

  const containerClasses = clsx(
    'relative',
    {
      'w-full': fullWidth,
    }
  );

  const selectClasses = clsx(
    'relative w-full px-4 py-3 text-left bg-transparent border-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-3 focus-visible:ring-accent-emerald focus-visible:ring-offset-2',
    'flex items-center justify-between cursor-pointer',
    {
      // Default variant
      'bg-white border-neutral-300 hover:border-primary focus:border-primary': 
        variant === 'default' && !error && !disabled,
      'bg-white border-error focus:border-error': 
        variant === 'default' && error && !disabled,
      
      // Glass variant
      'glass-underwater border-white/20 hover:border-accent-emerald/50 focus:border-accent-emerald/50': 
        variant === 'glass' && !error && !disabled,
      'glass-underwater border-error/50 focus:border-error': 
        variant === 'glass' && error && !disabled,
      
      // Underwater variant
      'glass-deep-water border-primary/30 hover:border-accent-emerald focus:border-accent-emerald': 
        variant === 'underwater' && !error && !disabled,
      'glass-deep-water border-error/50 focus:border-error': 
        variant === 'underwater' && error && !disabled,
        
      'opacity-60 cursor-not-allowed': disabled,
    }
  );

  const textClasses = clsx(
    'text-base flex-1 min-w-0',
    {
      'text-neutral-900': variant === 'default' && selectedOption,
      'text-neutral-500': variant === 'default' && !selectedOption,
      'text-white': (variant === 'glass' || variant === 'underwater') && selectedOption,
      'text-white/50': (variant === 'glass' || variant === 'underwater') && !selectedOption,
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
      'top-3 text-base': !isFocused && !selectedOption,
      'top-1 text-sm scale-90 origin-left': isFocused || selectedOption,
    }
  );

  const dropdownClasses = clsx(
    'absolute z-50 w-full mt-2 py-2 rounded-lg shadow-xl border max-h-60 overflow-y-auto',
    {
      'bg-white border-neutral-200': variant === 'default',
      'glass-underwater border-white/20': variant === 'glass',
      'glass-deep-water border-primary/30': variant === 'underwater',
    }
  );

  const optionClasses = (option: SelectOption, isSelected: boolean) => clsx(
    'w-full px-4 py-3 text-left text-base cursor-pointer transition-colors duration-150 flex items-center justify-between',
    {
      'text-neutral-900 hover:bg-neutral-50': variant === 'default' && !isSelected && !option.disabled,
      'text-primary bg-primary/10': variant === 'default' && isSelected,
      'text-white/90 hover:bg-white/10': (variant === 'glass' || variant === 'underwater') && !isSelected && !option.disabled,
      'text-accent-emerald bg-accent-emerald/20': (variant === 'glass' || variant === 'underwater') && isSelected,
      'opacity-50 cursor-not-allowed': option.disabled,
    }
  );

  const motionProps = config.enabled ? {
    animate: error ? fieldError : (isFocused ? fieldFocus : { scale: 1 }),
    transition: { duration: 0.2, ease: 'easeOut' }
  } : {};

  return (
    <div className={containerClasses}>
      <motion.div
        className="relative"
        {...motionProps}
      >
        <button
          ref={ref}
          type="button"
          name={name}
          className={selectClasses}
          onClick={handleToggle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={textClasses}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              'w-5 h-5 ml-2 flex-shrink-0',
              {
                'text-neutral-400': variant === 'default' && !isFocused && !error,
                'text-primary': variant === 'default' && isFocused && !error,
                'text-error': error,
                'text-white/50': (variant === 'glass' || variant === 'underwater') && !isFocused && !error,
                'text-accent-emerald': (variant === 'glass' || variant === 'underwater') && isFocused && !error,
              }
            )}
          >
            <ChevronDownIcon />
          </motion.div>
        </button>

        {/* Animated label */}
        {label && (
          <motion.label
            className={labelClasses}
            animate={isFocused || selectedOption ? {
              y: -12,
              scale: 0.85,
            } : {
              y: 0,
              scale: 1,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {label}
            {required && (
              <span className="text-error ml-1" aria-label="required">*</span>
            )}
          </motion.label>
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
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={dropdownClasses}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={optionClasses(option, isSelected)}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <CheckIcon className="w-4 h-4 ml-2 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-2 text-sm text-error flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;