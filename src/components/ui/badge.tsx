import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
    secondary: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    accent: 'bg-[var(--color-accent-glow)] text-[var(--color-accent-light)] border border-[var(--color-accent)]/30',
    outline: 'bg-transparent text-[var(--color-text-muted)] border border-[var(--color-border)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full transition-all duration-150',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
