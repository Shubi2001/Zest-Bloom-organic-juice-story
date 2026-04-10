import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  color?: string;
  showText?: boolean;
}

export default function Logo({ className, color = "#FF6B00", showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div 
        whileHover={{ rotate: 15, scale: 1.1 }}
        className="relative w-10 h-10 flex items-center justify-center"
      >
        {/* Leaf Shape */}
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M50 10C50 10 20 40 20 70C20 86.5685 33.4315 100 50 100C66.5685 100 80 86.5685 80 70C80 40 50 10 50 10Z" 
            fill={color} 
          />
          <path 
            d="M50 10V100" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round" 
            opacity="0.3"
          />
          <path 
            d="M50 40C50 40 65 45 70 55" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round" 
            opacity="0.3"
          />
          <path 
            d="M50 60C50 60 35 65 30 75" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round" 
            opacity="0.3"
          />
        </svg>
      </motion.div>
      
      {showText && (
        <span className="text-2xl font-display font-black uppercase tracking-tighter">
          Zest & Bloom
        </span>
      )}
    </div>
  );
}
