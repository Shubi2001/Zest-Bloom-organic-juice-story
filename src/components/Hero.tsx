import { motion } from 'motion/react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import JuiceBottle from './JuiceBottle';

export default function Hero() {
  const { theme, colors } = useJuiceTheme();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
      {/* Background Text */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center text-[30vw] font-display font-black uppercase pointer-events-none"
        style={{ color: colors[theme] }}
      >
        {theme}
      </motion.h1>

      <div className="z-10 text-center space-y-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <span className="text-sm font-display font-bold uppercase tracking-[0.5em] text-juice-dark/50">
            100% Organic & Cold Pressed
          </span>
          <h2 className="text-8xl md:text-[12rem] font-display font-black leading-none tracking-tighter">
            FRESHLY <br />
            <span style={{ color: colors[theme] }}>SQUEEZED</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 1 }}
          className="relative"
        >
          <JuiceBottle color={colors[theme]} className="w-48 h-96 mx-auto" />
          
          {/* Floating Accents */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-20 w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-center">
              No Added <br /> Sugar
            </span>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 -right-20 w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-center">
              Vitamin <br /> C+
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
