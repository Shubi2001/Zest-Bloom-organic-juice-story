import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface StorySectionProps {
  title: string;
  description: string;
  image?: string;
  color: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function StorySection({ title, description, color, reverse, children }: StorySectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const x = useTransform(scrollYProgress, [0, 0.2], [reverse ? 100 : -100, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className={cn(
        "min-h-screen flex flex-col md:flex-row items-center justify-center p-8 gap-12",
        reverse && "md:flex-row-reverse"
      )}
    >
      <motion.div style={{ x }} className="flex-1 space-y-6">
        <h2 className="text-6xl md:text-8xl font-display leading-tight" style={{ color }}>
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-juice-dark/70 max-w-xl leading-relaxed">
          {description}
        </p>
        <div className="pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg"
            style={{ backgroundColor: color }}
          >
            Taste the Magic
          </motion.button>
        </div>
      </motion.div>
      <div className="flex-1 flex justify-center items-center">
        {children}
      </div>
    </motion.section>
  );
}
