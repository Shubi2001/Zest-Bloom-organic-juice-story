import React, { createContext, useContext, useState } from 'react';

type Theme = 'orange' | 'green' | 'red' | 'yellow';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: Record<Theme, string>;
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useJuiceTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useJuiceTheme must be used within ThemeProvider');
  return context;
}
