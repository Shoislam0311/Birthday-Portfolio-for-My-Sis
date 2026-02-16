import React from 'react';
import { cn } from '../../lib/utils';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'intense';
  children: React.ReactNode;
  className?: string;
}

export default function GlowButton({
  variant = 'default',
  children,
  className,
  ...props
}: GlowButtonProps) {
  const variantStyles = {
    default: 'btn-violet',
    outline: 'btn-violet-outline',
    intense: 'btn-violet glow-violet',
  };

  return (
    <button
      className={cn(
        'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
