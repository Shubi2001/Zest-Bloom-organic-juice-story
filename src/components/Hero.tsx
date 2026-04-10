import { motion, useScroll, useTransform } from 'motion/react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import JuiceBottle from './JuiceBottle';
import { useRef } from 'react';

export default function Hero() {
  const { theme, colors } = useJuiceTheme();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effect for background text
  const bgY = useTransform(scrollY, [0, 500], [0, 200]);
  const bgRotate = useTransform(scrollY, [0, 500], [0, 10]);

  const characters = theme.split('');

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Text - Staggered Reveal */}
      <motion.div
        style={{ y: bgY, rotate: bgRotate }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div className="flex overflow-hidden">
          {characters.map((char, i) => (
            <motion.span
              key={`${theme}-${i}`}
              initial={{ y: "100%", opacity: 0, rotate: 20 }}
              animate={{ y: 0, opacity: 0.05, rotate: 0 }}
              transition={{
                duration: 1.2,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-[30vw] font-display font-black uppercase inline-block"
              style={{ color: colors[theme] }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div className="z-10 text-center space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
              }
            }
          }}
          className="space-y-2"
        >
          <motion.span 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 0.5 }
            }}
            className="text-sm font-display font-bold uppercase tracking-[0.5em] block"
          >
            100% Organic & Cold Pressed
          </motion.span>
          
          <motion.h2 
            variants={{
              hidden: { y: 40, opacity: 0, scale: 0.9 },
              visible: { y: 0, opacity: 1, scale: 1 }
            }}
            transition={{ type: "spring", damping: 12 }}
            className="text-8xl md:text-[12rem] font-display font-black leading-none tracking-tighter"
          >
            FRESHLY <br />
            <motion.span 
              animate={{ color: colors[theme] }}
              transition={{ duration: 0.8 }}
            >
              SQUEEZED
            </motion.span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15,
            delay: 1.2 
          }}
          className="relative group"
        >
          <div className="relative w-64 h-[32rem] mx-auto">
            <motion.img
              src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800"
              alt="Fresh Juice"
              className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white dark:border-white/10"
              referrerPolicy="no-referrer"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, 0]
              }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 300, damping: 20 }
              }}
            />
            
            {/* Logo Label Overlay */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm py-4 px-2 w-[70%] rounded-lg shadow-sm border border-black/5 flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: colors[theme] }} />
                <span className="text-[10px] font-display font-black uppercase tracking-tighter text-juice-dark leading-none">Zest & Bloom</span>
                <span className="text-[6px] font-bold uppercase tracking-[0.2em] text-juice-dark/40">Organic Juice</span>
              </div>
            </div>
            
            {/* Glow effect */}
            <div 
              className="absolute inset-0 blur-3xl opacity-30 -z-10 scale-110"
              style={{ backgroundColor: colors[theme] }}
            />
          </div>
          
          {/* Floating Accents - Enhanced Entrance */}
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              x: { delay: 1.5, duration: 1, ease: "easeOut" },
              opacity: { delay: 1.5, duration: 1 },
              scale: { delay: 1.5, duration: 1 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-10 -left-20 w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 shadow-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-center">
              No Added <br /> Sugar
            </span>
          </motion.div>
          
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              scale: 1,
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              x: { delay: 1.7, duration: 1, ease: "easeOut" },
              opacity: { delay: 1.7, duration: 1 },
              scale: { delay: 1.7, duration: 1 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-20 -right-20 w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 shadow-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-center">
              Vitamin <br /> C+
            </span>
          </motion.div>

          {/* New Decorative Bubbles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0],
                scale: [0, 1, 0.5],
                y: [-20, -150],
                x: i % 2 === 0 ? [-10, 20] : [10, -20]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: 2 + i * 0.5,
                ease: "easeOut"
              }}
              className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full border border-white/50"
              style={{ backgroundColor: colors[theme] }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
