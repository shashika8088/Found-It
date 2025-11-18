import React from 'react';
import { Item, User } from '../types';
import TimeIcon from './icons/TimeIcon';
import LocationIcon from './icons/LocationIcon';
import WhatsappIcon from './icons/WhatsappIcon';
import DeleteIcon from './icons/DeleteIcon';


interface ItemCardProps {
  item: Item;
  style?: React.CSSProperties;
  currentUser?: User | null;
  onRetrieve?: (id: string) => void;
  onDelete?: (id: string) => void;

}

const timeAgo = (input: string | Date): string => {
  const date = typeof input === "string" ? new Date(input) : input;
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const ItemCard: React.FC<ItemCardProps> = ({ item, style, currentUser, onRetrieve, onDelete }) => {
  const { title, description, location, imageUrl, timestamp, category, contactNumber, retrieved } = item;

  const handleContact = () => {
    if (retrieved) return; // Prevent action if already retrieved
    const sanitizedNumber = contactNumber.replace(/\D/g, '');
    const message = `Hi, I'm contacting you about the item "${title}" you reported on Found-It.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${sanitizedNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleMarkRetrieved = () => {
    if (!confirm("Mark this item as retrieved? This will move it to the Retrieved section.")) return;
    onRetrieve?.(item.id);
  };

  return (
    <div
      className="bg-surface dark:bg-dark-surface rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl relative"
      style={style}
    >
      <div className="relative">
        <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-dark-primary">
            {category}
          </p>
          <h3 className="text-lg font-bold font-serif text-text dark:text-dark-text mt-1">{title}</h3>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-2 mb-4">
            {description}
          </p>
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
        {/* Contact Button — Disabled when item is retrieved */}
        <button
          onClick={handleContact}
          disabled={retrieved}
          title={retrieved ? "This item has been retrieved" : "Contact via WhatsApp"}
          className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
            ${
              retrieved
                ? "cursor-not-allowed opacity-60 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                : "text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            }`}
        >
          <WhatsappIcon className="h-5 w-5 mr-2" />
          Contact via WhatsApp
        </button>

        {/* Owner-only Mark as Retrieved */}
        {/* Owner-only actions */}
        {currentUser?.id === item.ownerId && (
  <div className="flex gap-2 mt-3">

    {/* Show Mark as Retrieved ONLY when not retrieved */}
    {!retrieved && (
      <button
        onClick={handleMarkRetrieved}
        className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm
                   font-medium rounded-md text-amber-900 bg-amber-200 hover:bg-amber-300 
                   dark:bg-dark-primary dark:hover:bg-dark-primary-hover dark:text-dark-text
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300
                   transition-colors"
      >
        Mark as Retrieved
      </button>
    )}

    {/* Delete Button (Owner always allowed) */}
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this item? This cannot be undone.")) {
          onDelete?.(item.id);
        }
      }}
      title="Delete Item"
      className="px-3 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/50 
                 dark:hover:bg-red-900 text-red-700 dark:text-red-300 rounded-md 
                 flex items-center justify-center transition-colors"
    >
      <DeleteIcon className="h-5 w-5" />
    </button>

  </div>
)}



        {/* Retrieved label */}
        {retrieved && (
          <div className="mt-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">
            ✅ Retrieved
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
