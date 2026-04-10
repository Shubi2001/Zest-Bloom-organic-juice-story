import { motion } from 'motion/react';
import { useJuiceTheme } from '@/src/context/ThemeContext';
import { ShoppingBag, User as UserIcon, Menu, LogOut, Sun, Moon } from 'lucide-react';
import { User, signOut } from 'firebase/auth';
import { auth } from '@/src/firebase';
import Logo from './Logo';

interface NavbarProps {
  onAuthClick: () => void;
  onOrdersClick: () => void;
  user: User | null;
}

export default function Navbar({ onAuthClick, onOrdersClick, user }: NavbarProps) {
  const { theme, colors, isDarkMode, toggleDarkMode } = useJuiceTheme();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleOrdersClick = () => {
    if (!user) {
      onAuthClick();
    } else {
      onOrdersClick();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-white/10 dark:bg-black/10 backdrop-blur-md"
    >
      <Logo color={colors[theme]} />

      <div className="hidden md:flex items-center gap-8 font-display font-medium uppercase text-sm tracking-widest">
        <a href="#story" className="hover:opacity-50 transition-opacity">Our Story</a>
        <a href="#" className="hover:opacity-50 transition-opacity">Flavors</a>
        <a href="#subscriptions" className="hover:opacity-50 transition-opacity">Subscription</a>
        <a href="#feedback" className="hover:opacity-50 transition-opacity">Feedback</a>
      </div>

      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white dark:bg-white/10 shadow-sm"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.1 }} 
          onClick={handleOrdersClick}
          className="p-2 rounded-full bg-white dark:bg-white/10 shadow-sm"
        >
          <ShoppingBag size={20} />
        </motion.button>
        
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest opacity-50 hidden md:block">
              {user.displayName || user.email?.split('@')[0]}
            </span>
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              onClick={handleLogout}
              className="p-2 rounded-full bg-white dark:bg-white/10 shadow-sm text-red-500"
            >
              <LogOut size={20} />
            </motion.button>
          </div>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            onClick={onAuthClick}
            className="p-2 rounded-full bg-white dark:bg-white/10 shadow-sm"
          >
            <UserIcon size={20} />
          </motion.button>
        )}

        <button className="md:hidden p-2">
          <Menu size={24} />
        </button>
      </div>
    </motion.nav>
  );
}
