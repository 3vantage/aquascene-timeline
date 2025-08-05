'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { AnimationManager } from '@/lib/animation-config';
import { CheckIcon } from '@heroicons/react/24/outline';

export interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  variant?: 'default' | 'glass' | 'underwater';
  required?: boolean;
  error?: string;
  className?: string;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(({
  id,
  checked,
  onChange,
  label,
  description,
  disabled = false,
  variant = 'default',
  required = false,
  error,
  className,
}, ref) => {
  const animationManager = AnimationManager.getInstance();
  const config = animationManager.getAnimationConfig();

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
      
      // Haptic feedback on supported devices
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
  };

  const checkboxClasses = clsx(
    'relative flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 focus:outline-none focus-visible:ring-3 focus-visible:ring-accent-emerald focus-visible:ring-offset-2',
    {
      // Default variant
      'bg-white border-neutral-300 hover:border-primary': 
        variant === 'default' && !checked && !error && !disabled,
      'bg-primary border-primary text-white': 
        variant === 'default' && checked && !error,
      'bg-white border-error hover:border-error': 
        variant === 'default' && !checked && error && !disabled,
      'bg-error border-error text-white': 
        variant === 'default' && checked && error,
      
      // Glass variant
      'glass-underwater border-white/30 hover:border-accent-emerald/50': 
        variant === 'glass' && !checked && !error && !disabled,
      'bg-accent-emerald border-accent-emerald text-white': 
        variant === 'glass' && checked && !error,
      'glass-underwater border-error/50 hover:border-error': 
        variant === 'glass' && !checked && error && !disabled,
      'bg-error border-error text-white': 
        variant === 'glass' && checked && error,
      
      // Underwater variant
      'glass-deep-water border-primary/30 hover:border-accent-emerald': 
        variant === 'underwater' && !checked && !error && !disabled,
      'bg-gradient-to-br from-accent-emerald to-primary border-accent-emerald text-white': 
        variant === 'underwater' && checked && !error,
      'glass-deep-water border-error/50 hover:border-error': 
        variant === 'underwater' && !checked && error && !disabled,
      'bg-error border-error text-white': 
        variant === 'underwater' && checked && error,
        
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    }
  );

  const labelClasses = clsx(
    'text-sm cursor-pointer transition-colors duration-200',
    {
      'text-neutral-700 hover:text-neutral-900': variant === 'default' && !error && !disabled,
      'text-error': error,
      'text-white/90 hover:text-white': (variant === 'glass' || variant === 'underwater') && !error && !disabled,
      'opacity-50 cursor-not-allowed': disabled,
    }
  );

  const motionProps = config.enabled ? {
    whileTap: { scale: 0.95 },
    animate: checked ? { scale: [1, 1.1, 1] } : { scale: 1 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <div className={clsx('flex items-start gap-3', className)}>
      <motion.button
        ref={ref}
        type="button"
        id={id}
        role="checkbox"
        aria-checked={checked}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={description ? `${id}-description` : undefined}
        className={checkboxClasses}
        onClick={handleToggle}
        disabled={disabled}
        {...motionProps}
      >
        {/* Checkmark */}
        <motion.div
          initial={false}
          animate={{
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <CheckIcon className="w-3 h-3" strokeWidth={3} />
        </motion.div>

        {/* Focus ring for underwater variant */}
        {(variant === 'glass' || variant === 'underwater') && (
          <motion.div
            className="absolute inset-0 rounded border-2 border-accent-emerald opacity-0"
            animate={{ opacity: 0 }}
            whileFocus={{ opacity: 0.5 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>

      {/* Label and description */}
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label 
              htmlFor={id}
              className={labelClasses}
            >
              {label}
              {required && (
                <span className="text-error ml-1" aria-label="required">*</span>
              )}
            </label>
          )}
          
          {description && (
            <p 
              id={`${id}-description`}
              className={clsx(
                'mt-1 text-xs',
                {
                  'text-neutral-500': variant === 'default' && !error,
                  'text-error': error,
                  'text-white/60': (variant === 'glass' || variant === 'underwater') && !error,
                }
              )}
            >
              {description}
            </p>
          )}
          
          {error && (
            <motion.p
              className="mt-1 text-xs text-error flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </motion.p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;