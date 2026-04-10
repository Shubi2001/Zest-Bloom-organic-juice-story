import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useJuiceTheme } from '@/src/context/ThemeContext';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme, colors } = useJuiceTheme();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-32 right-8 z-40 p-4 rounded-full text-white shadow-2xl flex items-center justify-center border border-white/20 backdrop-blur-md"
          style={{ backgroundColor: colors[theme] }}
        >
          <ArrowUp size={24} strokeWidth={3} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
