import React from "react";
import { cn } from "@/lib/utils";

export function RainbowButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-white transition-colors [background-image:linear-gradient(90deg,#00d2ff_0%,#3a7bd5_25%,#00d2ff_50%,#3a7bd5_75%,#00d2ff_100%)] dark:bg-[length:200%] dark:text-black",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
