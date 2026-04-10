/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider, useJuiceTheme } from './context/ThemeContext';
import { FirebaseProvider, useFirebase } from './firebase.tsx';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import JuiceGlass from './components/JuiceGlass';
import JuiceBottle from './components/JuiceBottle';
import JuiceSelector from './components/JuiceSelector';
import Subscription from './components/Subscription';
import Feedback from './components/Feedback';
import AuthModal from './components/AuthModal';
import BackToTop from './components/BackToTop';
import OrdersModal from './components/OrdersModal';
import DynamicBackground from './components/DynamicBackground';
import Testimonials from './components/Testimonials';
import Logo from './components/Logo';
import { motion } from 'motion/react';
import { useState } from 'react';

function AppContent() {
  const { theme, colors } = useJuiceTheme();
  const { user, isAuthReady } = useFirebase();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-juice-paper">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-juice-orange border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="relative">
      <DynamicBackground />
      <CustomCursor />
      <Navbar 
        onAuthClick={() => setIsAuthOpen(true)} 
        onOrdersClick={() => setIsOrdersOpen(true)}
        user={user} 
      />
      
      <Hero />

      <StorySection
        id="story"
        title="NATURE'S FINEST"
        description="We source our fruits from local organic farms that respect the earth. Every drop is a testament to the purity of nature, cold-pressed to preserve every nutrient."
        color={colors.green}
        image="https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800"
      />

      <StorySection
        title="VIBRANT ENERGY"
        description="Fuel your body with the vibrant energy of the sun. Our citrus blends are packed with Vitamin C and antioxidants to keep you glowing from the inside out."
        color={colors.orange}
        image="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800"
        reverse
      />

      <StorySection
        title="DEEP RECOVERY"
        description="Recover faster with our beetroot and ginger infusions. Designed for the active soul, these blends support blood flow and muscle repair naturally."
        color={colors.red}
        image="https://images.unsplash.com/photo-1615485290382-441e4d019cb5?auto=format&fit=crop&q=80&w=800"
      />

      <StorySection
        title="THE PERFECT DUO"
        description="Why choose one when you can have both? Our Beetroot & Orange duo is the ultimate balance of earthy recovery and citrus energy. The perfect pair for your daily routine."
        color={colors.orange}
        image="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800"
        reverse
      />

      <StorySection
        title="PURE ZEST"
        description="Our lemon and ginger blend is the ultimate morning wake-up call. Zesty, spicy, and incredibly refreshing, it's the perfect way to kickstart your metabolism."
        color={colors.yellow}
        image="https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&q=80&w=800"
        reverse
      />

      <Testimonials />

      <Subscription id="subscriptions" />
      
      <Feedback id="feedback" />

      <footer className="py-20 text-center space-y-8">
        <Logo className="justify-center scale-150 mb-8" color={colors[theme]} />
        <div className="flex justify-center gap-8 text-sm font-bold uppercase tracking-widest opacity-50">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
        </div>
        <p className="text-xs opacity-30">© 2026 Zest & Bloom. All rights reserved.</p>
      </footer>

      <JuiceSelector />
      <BackToTop />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <OrdersModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
    </main>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </FirebaseProvider>
  );
}
