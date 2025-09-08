import React from 'react';
import { UserExperience } from '../types';
import StarRating from './StarRating';

interface ExperienceCardProps {
  experience: UserExperience;
  style?: React.CSSProperties;
}

const timeAgo = (date: Date): string => {
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

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, style }) => {
  const { name, avatarUrl, rating, comment, timestamp } = experience;

  return (
    <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-md p-6 flex flex-col h-full animate-slide-up" style={style}>
      <div className="flex-grow">
        <div className="flex items-center mb-4">
          <img className="h-12 w-12 rounded-full object-cover" src={avatarUrl} alt={name} />
          <div className="ml-4">
            <p className="font-semibold text-text dark:text-dark-text">{name}</p>
            <StarRating rating={rating} />
          </div>
        </div>
        <p className="text-text-secondary dark:text-dark-text-secondary italic">"{comment}"</p>
      </div>
      <p className="text-right text-xs text-text-muted dark:text-dark-text-muted mt-4">{timeAgo(timestamp)}</p>
    </div>
  );
};

export default ExperienceCard;
