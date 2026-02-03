"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef } from "react";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientOpacity = 0.8,
  gradientFrom = "#0f766e",
  gradientTo = "#14b8a6",
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef<number>(-gradientSize);
  const mouseY = useRef<number>(-gradientSize);

  const updateGradient = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", `${mouseX.current}px`);
      cardRef.current.style.setProperty("--mouse-y", `${mouseY.current}px`);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.current = e.clientX - rect.left;
        mouseY.current = e.clientY - rect.top;
        updateGradient();
      }
    },
    [updateGradient],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex size-full overflow-hidden rounded-xl border bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white",
        className,
      )}
    >
      <div className="relative z-10 w-full">{children}</div>
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${gradientSize}px circle at var(--mouse-x) var(--mouse-y), ${gradientFrom}, transparent 80%)`,
          opacity: gradientOpacity,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${gradientSize}px circle at var(--mouse-x) var(--mouse-y), ${gradientTo}, transparent 80%)`,
          mixBlendMode: 'overlay'
        } as React.CSSProperties}
      />
    </div>
  );
}
