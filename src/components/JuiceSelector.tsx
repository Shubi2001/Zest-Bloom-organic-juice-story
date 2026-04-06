import { motion } from 'motion/react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import { cn } from '@/src/lib/utils';

export default function JuiceSelector() {
  const { theme, setTheme, colors } = useJuiceTheme();

  const themes: Array<'orange' | 'green' | 'red' | 'yellow'> = ['orange', 'green', 'red', 'yellow'];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 bg-white/10 backdrop-blur-xl p-4 rounded-full border border-white/20 flex gap-4">
      {themes.map((t) => (
        <motion.button
          key={t}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(t)}
          className={cn(
            "w-12 h-12 rounded-full border-4 transition-all",
            theme === t ? "border-white scale-125 shadow-xl" : "border-transparent opacity-50"
          )}
          style={{ backgroundColor: colors[t] }}
        />
      ))}
    </div>
  );
}
