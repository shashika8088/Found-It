import React, { useState, FormEvent } from 'react';
import { UserExperience } from '../types';
import StarRating from './StarRating';
import Spinner from './Spinner';

interface ShareExperienceProps {
  onAddExperience: (experience: Omit<UserExperience, 'id' | 'timestamp' | 'avatarUrl'>) => Promise<void>;
}

const ShareExperience: React.FC<ShareExperienceProps> = ({ onAddExperience }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !name || !comment) {
      setError('Please fill out all fields and provide a rating.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    try {
      await onAddExperience({ name, comment, rating });
      setIsSuccess(true);
      // Reset form after a delay
      setTimeout(() => {
        setName('');
        setComment('');
        setRating(0);
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-amber-50/50 dark:bg-dark-surface/20 rounded-2xl shadow-lg p-6 md:p-8 border border-amber-200/50 dark:border-slate-700/50">
      <h2 className="text-3xl font-bold font-serif text-text dark:text-dark-text text-center">Share Your Story</h2>
      <p className="text-center text-text-secondary dark:text-dark-text-secondary mt-2 mb-8">
        Were you reunited with your item? Share your experience with the community!
      </p>

      {isSuccess ? (
        <div className="text-center py-10 bg-green-50 dark:bg-green-900/30 rounded-lg animate-fade-in">
          <h3 className="text-2xl font-semibold font-serif text-green-700 dark:text-green-300">Thank You!</h3>
          <p className="mt-2 text-green-600 dark:text-green-400">Your story has been shared.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-1/2">
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Your Name</label>
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300/70 dark:border-slate-700/70 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-dark-surface/80 sm:text-sm" />
            </div>
            <div className="sm:w-1/2">
              <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Your Rating</label>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Your Story</label>
            <textarea name="comment" id="comment" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300/70 dark:border-slate-700/70 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-dark-surface/80 sm:text-sm" placeholder="I lost my keys and..."></textarea>
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-amber-950 bg-amber-300 hover:bg-amber-400 dark:bg-dark-primary dark:hover:bg-dark-primary-hover dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300 dark:focus:ring-dark-primary transition-colors disabled:opacity-50"
            >
              {isSubmitting ? <Spinner small /> : 'Share My Story'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShareExperience;