import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface JuiceGlassProps {
  color: string;
  fillLevel?: number; // 0 to 100
  className?: string;
}

export default function JuiceGlass({ color, fillLevel = 70, className }: JuiceGlassProps) {
  return (
    <div className={cn("relative w-40 h-56", className)}>
      {/* Glass Outline */}
      <svg
        viewBox="0 0 100 150"
        className="absolute inset-0 w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 10 L25 140 C27 145 32 148 37 148 H63 C68 148 73 145 75 140 L90 10"
          stroke="#1A1A1A"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Juice Fill */}
      <div className="absolute inset-0 p-4 overflow-hidden" style={{ clipPath: 'polygon(10% 0, 90% 0, 75% 100%, 25% 100%)' }}>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${fillLevel}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0"
          style={{ backgroundColor: color }}
        >
          {/* Surface Wave */}
          <motion.div
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 left-0 right-0 h-4 bg-white/20 blur-sm"
          />
        </motion.div>
      </div>
    </div>
  );
}
