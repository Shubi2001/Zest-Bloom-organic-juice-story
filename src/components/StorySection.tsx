import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Share2 } from 'lucide-react';
import JuiceBottle from './JuiceBottle';

interface StorySectionProps {
  id?: string;
  title: string;
  description: string;
  image?: string;
  color: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function StorySection({ id, title, description, image, color, reverse, children }: StorySectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const x = useTransform(scrollYProgress, [0, 0.2], [reverse ? 100 : -100, 0]);

  const handleShare = async () => {
    const shareData = {
      title: `Zest & Bloom - ${title}`,
      text: description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert('Story details copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity, scale }}
      className={cn(
        "min-h-screen flex flex-col md:flex-row items-center justify-center p-8 gap-12 max-w-7xl mx-auto",
        reverse && "md:flex-row-reverse"
      )}
    >
      <motion.div style={{ x }} className="flex-1 space-y-6">
        <h2 className="text-6xl md:text-8xl font-display leading-tight" style={{ color }}>
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-juice-dark/70 dark:text-juice-paper/70 max-w-xl leading-relaxed">
          {description}
        </p>
        <div className="pt-8 flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg"
            style={{ backgroundColor: color }}
          >
            Taste the Magic
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-6 py-4 rounded-full bg-white dark:bg-white/10 text-juice-dark dark:text-juice-paper font-bold text-lg shadow-lg border border-juice-dark/5 flex items-center gap-2"
          >
            <Share2 size={20} style={{ color }} />
            Share Story
          </motion.button>
        </div>
      </motion.div>
      <div className="flex-1 flex justify-center items-center relative">
        {image ? (
          <motion.div 
            initial={{ rotate: reverse ? -5 : 5 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="relative z-10 w-full max-w-md aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-white/10"
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Logo Label Overlay */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm py-4 px-2 w-[70%] rounded-lg shadow-sm border border-black/5 flex flex-col items-center gap-1 scale-75 md:scale-100">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[10px] font-display font-black uppercase tracking-tighter text-juice-dark leading-none">Zest & Bloom</span>
                <span className="text-[6px] font-bold uppercase tracking-[0.2em] text-juice-dark/40">Organic Juice</span>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        ) : children}
        
        {/* Decorative background shape */}
        <div 
          className="absolute inset-0 blur-[100px] opacity-10 -z-10 scale-150"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.section>
  );
}
