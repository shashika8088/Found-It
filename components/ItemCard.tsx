import React from 'react';
import { Item } from '../types';
import TimeIcon from './icons/TimeIcon';
import LocationIcon from './icons/LocationIcon';
import WhatsappIcon from './icons/WhatsappIcon';

interface ItemCardProps {
  item: Item;
  style?: React.CSSProperties;
}

const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};


const ItemCard: React.FC<ItemCardProps> = ({ item, style }) => {
  const { title, description, location, imageUrl, timestamp, category, contactNumber } = item;
  
  const handleContact = () => {
    // Sanitize the number by removing all non-digit characters (e.g., +, -, (), spaces).
    const sanitizedNumber = contactNumber.replace(/\D/g, '');
    // URL-encode the message to handle special characters in the title.
    const message = `Hi, I'm contacting you about the item "${title}" you reported on Found-It.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${sanitizedNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl relative" style={style}>
      <div className="relative">
        <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-dark-primary">{category}</p>
            <h3 className="text-lg font-bold font-serif text-text dark:text-dark-text mt-1">{title}</h3>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-2 mb-4">{description}</p>
        </div>
        
        <div className="space-y-2 text-sm text-text-muted dark:text-dark-text-muted">
          <div className="flex items-center">
            <LocationIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <TimeIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{timeAgo(timestamp)}</span>
          </div>
        </div>
      </div>
       <div className="p-4 pt-0">
        <button 
          onClick={handleContact}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <WhatsappIcon className="h-5 w-5 mr-2" />
          Contact via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ItemCard;