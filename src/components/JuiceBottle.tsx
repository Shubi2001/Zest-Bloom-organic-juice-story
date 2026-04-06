import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface JuiceBottleProps {
  color: string;
  fillLevel?: number; // 0 to 100
  className?: string;
}

export default function JuiceBottle({ color, fillLevel = 80, className }: JuiceBottleProps) {
  return (
    <div className={cn("relative w-32 h-64", className)}>
      {/* Bottle Outline */}
      <svg
        viewBox="0 0 100 200"
        className="absolute inset-0 w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 10h40v20h10c5 0 10 5 10 10v140c0 10-10 20-20 20H30c-10 0-20-10-20-20V40c0-5 5-10 10-10h10V10z"
          stroke="#1A1A1A"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>

      {/* Juice Fill */}
      <div className="absolute inset-0 p-2 juice-bottle-mask">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${fillLevel}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0"
          style={{ backgroundColor: color }}
        >
          {/* Bubbles */}
          <motion.div
            animate={{ y: [-10, -100], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/4 w-2 h-2 bg-white/30 rounded-full"
          />
          <motion.div
            animate={{ y: [-20, -120], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute left-2/3 w-3 h-3 bg-white/30 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
