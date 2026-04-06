/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider, useJuiceTheme } from './context/ThemeContext';
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
import { motion } from 'motion/react';
import { useState } from 'react';

function AppContent() {
  const { theme, colors } = useJuiceTheme();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <main className="relative">
      <CustomCursor />
      <Navbar onAuthClick={() => setIsAuthOpen(true)} />
      
      <Hero />

      <StorySection
        title="NATURE'S FINEST"
        description="We source our fruits from local organic farms that respect the earth. Every drop is a testament to the purity of nature, cold-pressed to preserve every nutrient."
        color={colors.green}
      >
        <JuiceGlass color={colors.green} fillLevel={90} className="scale-150" />
      </StorySection>

      <StorySection
        title="VIBRANT ENERGY"
        description="Fuel your body with the vibrant energy of the sun. Our citrus blends are packed with Vitamin C and antioxidants to keep you glowing from the inside out."
        color={colors.orange}
        reverse
      >
        <JuiceBottle color={colors.orange} fillLevel={85} className="scale-125" />
      </StorySection>

      <StorySection
        title="DEEP RECOVERY"
        description="Recover faster with our beet and berry infusions. Designed for the active soul, these blends support blood flow and muscle repair naturally."
        color={colors.red}
      >
        <div className="flex gap-4">
          <JuiceGlass color={colors.red} fillLevel={60} />
          <JuiceGlass color={colors.red} fillLevel={40} className="translate-y-8" />
        </div>
      </StorySection>

      <Subscription />
      
      <Feedback />

      <footer className="py-20 text-center space-y-8">
        <div className="text-4xl font-display font-black uppercase tracking-tighter">
          Zest & Bloom
        </div>
        <div className="flex justify-center gap-8 text-sm font-bold uppercase tracking-widest opacity-50">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
        </div>
        <p className="text-xs opacity-30">© 2026 Zest & Bloom. All rights reserved.</p>
      </footer>

      <JuiceSelector />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
