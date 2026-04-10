import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface JuiceBottleProps {
  color: string;
  fillLevel?: number; // 0 to 100
  imageUrl?: string;
  className?: string;
}

export default function JuiceBottle({ color, fillLevel = 80, imageUrl, className }: JuiceBottleProps) {
  if (imageUrl) {
    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        className={cn("relative group", className)}
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 w-full h-full"
        >
          <img 
            src={imageUrl} 
            alt="Juice Bottle" 
            className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white dark:border-white/10"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo Overlay on Bottle Label */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm py-4 px-2 w-[80%] rounded-lg shadow-sm border border-black/5 flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] font-display font-black uppercase tracking-tighter text-juice-dark leading-none">Zest & Bloom</span>
              <span className="text-[6px] font-bold uppercase tracking-[0.2em] text-juice-dark/40">Organic Juice</span>
            </div>
          </div>
          
          {/* Label overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[3rem]" />
        </motion.div>

        {/* Dynamic Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 blur-3xl -z-10 scale-110 rounded-full"
          style={{ backgroundColor: color }}
        />
      </motion.div>
    );
  }

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

      {/* Logo on SVG Bottle */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-20">
        <div className="bg-white/80 backdrop-blur-sm p-2 rounded border border-black/5 flex flex-col items-center">
          <span className="text-[8px] font-display font-black uppercase tracking-tighter text-juice-dark leading-none">Zest & Bloom</span>
        </div>
      </div>
    </div>
  );
}
