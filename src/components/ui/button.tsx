import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-[var(--color-accent)] text-white hover:opacity-90 border border-[var(--color-accent)] shadow-md shadow-[var(--color-accent-glow)]',
      outline: 'bg-transparent text-[var(--color-accent-light)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-hover)]',
      ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]',
      secondary: 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-bg-hover)]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-full',
      md: 'px-5 py-2.5 text-sm rounded-full font-medium',
      lg: 'px-7 py-3 text-base rounded-full font-semibold',
      icon: 'p-2.5 rounded-full aspect-square flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-95',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
