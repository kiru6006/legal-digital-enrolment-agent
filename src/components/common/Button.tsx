import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'brand' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        'bg-[var(--google-blue-strong)] text-white hover:opacity-95 active:opacity-90 shadow-xs border border-transparent disabled:opacity-50',
      secondary:
        'bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] active:bg-[var(--color-border-strong)] border border-[var(--color-border)] disabled:opacity-50',
      outline:
        'bg-[var(--color-surface-white)] text-[var(--color-text-primary)] hover:bg-[var(--semantic-primary-soft)] hover:text-[var(--google-blue-strong)] hover:border-[var(--color-border-strong)] border border-[var(--color-border)] active:bg-[var(--color-surface-muted)] shadow-xs disabled:opacity-50',
      ghost:
        'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] border border-transparent disabled:opacity-40',
      danger:
        'bg-[var(--google-red)] text-white hover:bg-[var(--google-red-dark)] active:opacity-90 shadow-xs border border-transparent disabled:opacity-50',
      brand:
        'bg-[var(--vignxs-crimson)] text-white hover:bg-[var(--vignxs-crimson-deep)] active:opacity-90 shadow-xs border border-transparent disabled:opacity-50',
      ai:
        'bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-indigo)] text-white hover:opacity-95 active:opacity-90 shadow-xs border border-transparent disabled:opacity-50',
    };

    const sizeStyles = {
      sm: 'text-xs px-2.5 py-1.5 rounded-md gap-1.5',
      md: 'text-xs sm:text-sm px-3.5 py-2 rounded-lg gap-2 font-medium',
      lg: 'text-sm sm:text-base px-5 py-2.5 rounded-lg gap-2.5 font-medium',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-[var(--google-blue)]/30 disabled:cursor-not-allowed cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-0.5 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
