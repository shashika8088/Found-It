import React from 'react';

interface LogoIconProps {
  theme: 'light' | 'dark';
}

const LogoIcon: React.FC<LogoIconProps> = ({ theme }) => {
  const bgColor = theme === 'light' ? 'bg-amber-300' : 'bg-dark-primary';
  const iconColor = theme === 'light' ? 'text-amber-950' : 'text-dark-text';

  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-md ${bgColor} transition-colors`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 ${iconColor} transition-colors`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  );
};

export default LogoIcon;