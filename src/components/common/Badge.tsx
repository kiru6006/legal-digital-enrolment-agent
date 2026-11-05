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
    primary: 'bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)] border-[#C2E7FF] dark:border-blue-900/60',
    success: 'bg-[var(--semantic-success-soft)] text-[var(--google-green-dark)] border-[#C4EED0] dark:border-emerald-900/60',
    warning: 'bg-[var(--semantic-warning-soft)] text-[#B06000] dark:text-[#FDD663] border-[#FEEFC3] dark:border-amber-900/60',
    danger: 'bg-[var(--semantic-error-soft)] text-[var(--google-red-dark)] border-[#FAD2CF] dark:border-rose-900/60',
    violet: 'bg-[var(--semantic-ai-soft)] text-[var(--color-purple-dark)] border-[#E9D5FF] dark:border-purple-900/60',
    brand: 'bg-[var(--vignxs-soft)] text-[var(--vignxs-crimson)] border-[var(--vignxs-pink-light)] dark:border-rose-950',
    neutral: 'bg-[var(--semantic-neutral-soft)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
    blue: 'bg-[var(--semantic-primary-soft)] text-[var(--google-blue-strong)] border-[#C2E7FF] dark:border-blue-900/60',
    green: 'bg-[var(--semantic-success-soft)] text-[var(--google-green-dark)] border-[#C4EED0] dark:border-emerald-900/60',
    amber: 'bg-[var(--semantic-warning-soft)] text-[#B06000] dark:text-[#FDD663] border-[#FEEFC3] dark:border-amber-900/60',
    red: 'bg-[var(--semantic-error-soft)] text-[var(--google-red-dark)] border-[#FAD2CF] dark:border-rose-900/60',
    purple: 'bg-[var(--semantic-ai-soft)] text-[var(--color-purple-dark)] border-[#E9D5FF] dark:border-purple-900/60',
    gray: 'bg-[var(--semantic-neutral-soft)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
    outline: 'bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded font-semibold',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-md',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border transition-colors whitespace-nowrap shrink-0',
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
