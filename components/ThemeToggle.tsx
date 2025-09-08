import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-slate-200 hover:text-text dark:text-dark-text-muted dark:hover:bg-dark-surface dark:hover:text-dark-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-dark-primary"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <SunIcon
        className={`h-5 w-5 transform transition-transform duration-500 ${
          theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
      />
      <MoonIcon
        className={`absolute h-5 w-5 transform transition-transform duration-500 ${
          theme === 'light' ? '-rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
