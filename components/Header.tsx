import React from 'react';
import ThemeToggle from './ThemeToggle';
import LogoIcon from './icons/LogoIcon';

interface HeaderProps {
  onReportItem: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReportItem, theme, toggleTheme }) => {
  return (
    <header className="bg-surface dark:bg-dark-surface shadow-md sticky top-0 z-10 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <LogoIcon theme={theme} />
            <h1 className="text-2xl font-serif font-bold text-text dark:text-dark-text tracking-tight">
              Found-It
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={onReportItem}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-amber-950 bg-amber-300 hover:bg-amber-400 dark:bg-dark-primary dark:hover:bg-dark-primary-hover dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300 dark:focus:ring-dark-primary transition-colors"
            >
              Report an Item
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;