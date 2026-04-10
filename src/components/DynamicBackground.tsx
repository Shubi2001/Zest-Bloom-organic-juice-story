import { motion } from 'motion/react';
import { useJuiceTheme } from '@/src/context/ThemeContext';

export default function DynamicBackground() {
  const { theme, colors } = useJuiceTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Moving Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-10"
        style={{ backgroundColor: colors[theme] }}
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 -right-40 w-[50rem] h-[50rem] rounded-full blur-[150px] opacity-10"
        style={{ backgroundColor: colors[theme] }}
      />

      <motion.div
        animate={{
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full blur-[100px] opacity-5"
        style={{ backgroundColor: colors[theme] }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
    </div>
  );
}
