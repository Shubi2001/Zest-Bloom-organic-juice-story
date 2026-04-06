import { motion } from 'motion/react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import { ShoppingBag, User, Menu } from 'lucide-react';

interface NavbarProps {
  onAuthClick: () => void;
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  const { theme, colors } = useJuiceTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-white/10 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors[theme] }} />
        <span className="text-2xl font-display font-black uppercase tracking-tighter">Zest & Bloom</span>
      </div>

      <div className="hidden md:flex items-center gap-8 font-display font-medium uppercase text-sm tracking-widest">
        <a href="#" className="hover:opacity-50 transition-opacity">Our Story</a>
        <a href="#" className="hover:opacity-50 transition-opacity">Flavors</a>
        <a href="#" className="hover:opacity-50 transition-opacity">Subscription</a>
        <a href="#" className="hover:opacity-50 transition-opacity">Feedback</a>
      </div>

      <div className="flex items-center gap-4">
        <motion.button whileHover={{ scale: 1.1 }} className="p-2 rounded-full bg-white shadow-sm">
          <ShoppingBag size={20} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          onClick={onAuthClick}
          className="p-2 rounded-full bg-white shadow-sm"
        >
          <User size={20} />
        </motion.button>
        <button className="md:hidden p-2">
          <Menu size={24} />
        </button>
      </div>
    </motion.nav>
  );
}
