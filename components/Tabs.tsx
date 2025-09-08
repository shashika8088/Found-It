import React from 'react';
import { ItemType } from '../types';

interface TabsProps {
  activeTab: ItemType;
  onTabChange: (tab: ItemType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const getTabClasses = (tab: ItemType) => {
    const baseClasses = "w-1/2 py-3 text-center font-semibold text-lg rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 dark:focus:ring-offset-dark-surface focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2";
    if (activeTab === tab) {
      return `${baseClasses} bg-surface dark:bg-dark-background text-primary dark:text-dark-primary shadow-md`;
    }
    return `${baseClasses} text-text-secondary dark:text-dark-text-secondary hover:bg-surface/60 dark:hover:bg-dark-surface/60`;
  };

  return (
    <div className="bg-amber-100/70 dark:bg-dark-surface/50 p-1.5 rounded-xl flex">
      <button onClick={() => onTabChange(ItemType.LOST)} className={getTabClasses(ItemType.LOST)}>
        Lost Items
      </button>
      <button onClick={() => onTabChange(ItemType.FOUND)} className={getTabClasses(ItemType.FOUND)}>
        Found Items
      </button>
    </div>
  );
};

export default Tabs;
