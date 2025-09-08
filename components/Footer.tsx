import React from 'react';
import GithubIcon from './icons/GithubIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface/50 dark:bg-dark-surface/20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <p className="text-sm text-text-muted dark:text-dark-text-muted">
            &copy; {new Date().getFullYear()} Found-It. All rights reserved.
          </p>
          <p className="text-sm text-text-muted dark:text-dark-text-muted">
            Website developed by Shashika R V
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <a href="https://www.linkedin.com/in/shashika-r-v-06820b358/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text transition-colors">
            <LinkedInIcon className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://github.com/shashika8088" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text transition-colors">
            <GithubIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;