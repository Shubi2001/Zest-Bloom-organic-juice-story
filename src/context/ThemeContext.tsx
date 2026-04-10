import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'orange' | 'green' | 'red' | 'yellow';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: Record<Theme, string>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const colors: Record<Theme, string> = {
  orange: '#FF8A00',
  green: '#4CAF50',
  red: '#F44336',
  yellow: '#FFEB3B',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('orange');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', String(newMode));
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useJuiceTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useJuiceTheme must be used within ThemeProvider');
  return context;
}
