import React, { useState } from 'react';
import StarIcon from './icons/StarIcon';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const isInteractive = onRatingChange !== undefined;

  const handleMouseEnter = (index: number) => {
    if (isInteractive) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className={`flex items-center ${isInteractive ? 'cursor-pointer' : ''}`} onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((index) => {
        const fillValue = hoverRating >= index ? '100%' : rating >= index ? '100%' : '0%';
        const colorClass = hoverRating >= index || rating >= index
          ? 'text-amber-400'
          : 'text-slate-300 dark:text-slate-600';

        return (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
          >
            <StarIcon className={`h-5 w-5 ${colorClass} transition-colors`} />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
