import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export function GlitchText({ children, className, as: Component = 'span' }: GlitchTextProps) {
  return (
    <Component 
      className={cn("relative inline-block hover:animate-glitch", className)}
      data-text={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Component>
  );
}
