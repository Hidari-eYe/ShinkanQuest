import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TerminalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export function TerminalButton({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: TerminalButtonProps) {
  const baseStyles = "relative px-6 py-3 font-mono font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-background";
  
  const variants = {
    primary: "border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black focus:ring-cyber-primary",
    secondary: "border-cyber-dim text-cyber-dim hover:text-white hover:border-white focus:ring-white",
    danger: "border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-white focus:ring-cyber-accent",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Hover decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 hover:opacity-10 pointer-events-none" />
    </button>
  );
}
