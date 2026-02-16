import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  onClick,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'card-violet rounded-xl p-6',
        hover && 'card-violet-hover cursor-pointer',
        onClick && 'active:scale-95',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
