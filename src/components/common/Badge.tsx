import React from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'violet'
  | 'brand'
  | 'neutral'
  | 'blue'
  | 'green'
  | 'amber'
  | 'red'
  | 'purple'
  | 'gray'
  | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-[var(--semantic-neutral-soft)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
    primary: 'bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)] border-[#C2E7FF]',
    success: 'bg-[var(--semantic-success-soft)] text-[var(--google-green-dark)] border-[#C4EED0]',
    warning: 'bg-[var(--semantic-warning-soft)] text-[#B06000] border-[#FEEFC3]',
    danger: 'bg-[var(--semantic-error-soft)] text-[var(--google-red-dark)] border-[#FAD2CF]',
    violet: 'bg-[var(--semantic-ai-soft)] text-[var(--color-purple-dark)] border-[#E9D5FF]',
    brand: 'bg-[var(--vignxs-soft)] text-[var(--vignxs-crimson)] border-[var(--vignxs-pink-light)]',
    neutral: 'bg-[var(--semantic-neutral-soft)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
    blue: 'bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)] border-[#C2E7FF]',
    green: 'bg-[var(--semantic-success-soft)] text-[var(--google-green-dark)] border-[#C4EED0]',
    amber: 'bg-[var(--semantic-warning-soft)] text-[#B06000] border-[#FEEFC3]',
    red: 'bg-[var(--semantic-error-soft)] text-[var(--google-red-dark)] border-[#FAD2CF]',
    purple: 'bg-[var(--semantic-ai-soft)] text-[var(--color-purple-dark)] border-[#E9D5FF]',
    gray: 'bg-[var(--semantic-neutral-soft)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
    outline: 'bg-transparent text-slate-700 border-slate-300',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded font-semibold',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-md',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
