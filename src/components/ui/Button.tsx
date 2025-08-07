'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;

    // Haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    onClick?.(e);
  };

  const baseClasses = clsx(
    'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus-visible:ring-3 focus-visible:ring-accent-emerald focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed overflow-hidden hover:scale-105 active:scale-95',
    {
      'w-full': fullWidth,
      'cursor-not-allowed opacity-60': disabled || isLoading,
    }
  );

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-accent-emerald text-white shadow-emerald hover:shadow-lg border-0',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
    ghost: 'bg-transparent text-primary hover:bg-primary/10 border-0'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm h-9',
    md: 'px-6 py-3 text-base h-11',
    lg: 'px-8 py-4 text-lg h-13',
    xl: 'px-10 py-5 text-xl h-16'
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {/* Button content */}
      <span className="flex items-center justify-center gap-2 relative z-10">
        {isLoading ? (
          <div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
          />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </span>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-current/10 rounded-lg" />
      )}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;