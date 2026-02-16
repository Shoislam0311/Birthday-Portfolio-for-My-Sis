import React from 'react';
import { cn } from '../../lib/utils';

interface NeonTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'intense';
}

export default function NeonText({
  children,
  className,
  variant = 'default',
}: NeonTextProps) {
  const variantStyles = {
    default: 'text-glow-violet',
    gradient: 'text-gradient-violet',
    intense: 'text-glow-violet-intense',
  };

  return (
    <span className={cn(variantStyles[variant], className)}>
      {children}
    </span>
  );
}
