import React from 'react';
import ThemeToggle from './ThemeToggle';
import LogoIcon from './icons/LogoIcon';
import { User } from '../types';

interface HeaderProps {
  onReportItem: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user?: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onReportItem,
  theme,
  toggleTheme,
  user,
  onLoginClick,
  onLogout,
}) => {
  return (
    <header className="bg-surface dark:bg-dark-surface shadow-md sticky top-0 z-10 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* --- Left: Logo --- */}
          <div className="flex items-center space-x-3">
            <LogoIcon theme={theme} />
            <h1 className="text-2xl font-serif font-bold text-text dark:text-dark-text tracking-tight">
              Found-It
            </h1>
          </div>

          {/* --- Right: Theme, Auth, and Report Buttons --- */}
          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* 👇 Auth Section */}
            {user ? (
              <>
                <span className="hidden sm:inline-block text-sm text-text-secondary dark:text-dark-text-secondary">
                  👋 {user.username}
                </span>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md
                             text-amber-950 bg-amber-200 hover:bg-amber-300
                              dark:bg-dark-primary dark:hover:bg-dark-primary-hover dark:text-dark-text
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300 dark:focus:ring-dark-primary
                         transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md
                           text-amber-950 bg-amber-200 hover:bg-amber-300
                            dark:bg-dark-primary dark:hover:bg-dark-primary-hover dark:text-dark-text
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300 dark:focus:ring-dark-primary
                         transition-colors"
              >
                Sign In
              </button>
            )}

            {/* --- Report an Item Button --- */}
            <button
              onClick={onReportItem}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm
                         text-amber-950 bg-amber-300 hover:bg-amber-400
                         dark:bg-dark-primary dark:hover:bg-dark-primary-hover dark:text-dark-text
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300 dark:focus:ring-dark-primary
                         transition-colors"
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
