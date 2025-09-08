import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { Item, ItemType } from '../types';
import { generateItemDetailsFromImage } from '../services/geminiService';
import Spinner from './Spinner';
import SparklesIcon from './icons/SparklesIcon';
import Textarea from './ui/Textarea';

// Using a simple transition implementation for the modal.
const useModalTransition = (isOpen: boolean) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return isRendered;
};


interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Omit<Item, 'id' | 'timestamp'>) => Promise<void>;
}

const ItemFormModal: React.FC<ItemFormModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [type, setType] = useState<ItemType>(ItemType.LOST);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isRendered = useModalTransition(isOpen);

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setType(ItemType.LOST);
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
      setContactNumber('');
      setImageFile(null);
      setImagePreview(null);
      setError(null);
      setIsSubmitting(false);
      setIsAnalyzing(false);
    }
  }, [isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        analyzeImage(reader.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (dataUrl: string, mimeType: string) => {
    const base64 = dataUrl.split(',')[1];
    if (!base64) return;

    setIsAnalyzing(true);
    setError(null);
    try {
      const details = await generateItemDetailsFromImage(base64, mimeType);
      setTitle(details.title);
      setDescription(details.description);
      setCategory(details.category);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
        setError("Please upload an image of the item.");
        return;
    }
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onAddItem({
        type,
        title,
        description,
        category,
        location,
        contactNumber,
        imageUrl: imagePreview, // In a real app, you'd upload this and get a URL. For this mock, we use the data URL.
      });
    } catch (err) {
      setError('Failed to add item. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isRendered) return null;

  const inputClasses = "mt-1 block w-full rounded-lg border-2 border-slate-200/80 bg-slate-50 dark:border-slate-700/60 dark:bg-dark-surface/50 shadow-sm focus:border-primary dark:focus:border-dark-primary focus:ring focus:ring-primary/20 dark:focus:ring-dark-primary/20 transition-colors sm:text-sm";

  return (
     <div
      className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500/75 dark:bg-black/80 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className={`inline-block align-bottom bg-background dark:bg-dark-surface rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <form onSubmit={handleSubmit}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-xl leading-6 font-bold font-serif text-text dark:text-dark-text" id="modal-title">
                Report an Item
              </h3>
              <div className="mt-4 space-y-4">
                {/* Item Type */}
                <div className="bg-amber-100/70 dark:bg-dark-surface/50 p-1.5 rounded-xl flex">
                  <button type="button" onClick={() => setType(ItemType.LOST)} className={`w-1/2 py-2 text-center font-semibold rounded-lg transition-colors ${type === ItemType.LOST ? 'bg-surface dark:bg-dark-background shadow' : 'hover:bg-surface/60'}`}>I Lost Something</button>
                  <button type="button" onClick={() => setType(ItemType.FOUND)} className={`w-1/2 py-2 text-center font-semibold rounded-lg transition-colors ${type === ItemType.FOUND ? 'bg-surface dark:bg-dark-background shadow' : 'hover:bg-surface/60'}`}>I Found Something</button>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300/70 dark:border-slate-700/70 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Item preview" className="mx-auto h-32 w-auto rounded-md object-contain" />
                          <button type="button" onClick={() => {setImagePreview(null); setImageFile(null); if(fileInputRef.current) fileInputRef.current.value = '';}} className="absolute top-0 right-0 -mt-2 -mr-2 bg-white rounded-full p-1 text-red-500 shadow-md">&times;</button>
                        </div>
                      ) : (
                        <svg className="mx-auto h-12 w-12 text-text-muted" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                           <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      <div className="flex text-sm text-text-muted">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-surface dark:bg-dark-surface rounded-md font-medium text-primary dark:text-dark-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" ref={fileInputRef} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-text-muted">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {isAnalyzing && (
                    <div className="flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <SparklesIcon className="h-5 w-5 text-blue-500 mr-2 animate-pulse" />
                        <p className="text-sm text-blue-700 dark:text-blue-300">Analyzing image with Gemini...</p>
                    </div>
                )}

                {/* Form Fields */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Title</label>
                  <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Description</label>
                  <Textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    maxLength={500}
                    placeholder="e.g., A standard size black Hydro Flask with a few stickers on it..."
                    className="mt-1"
                  />
                </div>
                 <div>
                  <label htmlFor="category" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Category</label>
                  <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">{type === ItemType.LOST ? 'Last Seen Location' : 'Location Found'}</label>
                  <input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">WhatsApp Number (with Country Code)</label>
                  <input type="tel" name="contactNumber" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required placeholder="e.g. 14155552671" className={inputClasses} />
                  <p className="mt-1 text-xs text-text-muted dark:text-dark-text-muted">Enter the full number including the country code, without '+' or other symbols.</p>
                </div>
              </div>
              {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}
            </div>
            <div className="bg-slate-50 dark:bg-dark-surface/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isSubmitting || isAnalyzing}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-amber-950 bg-amber-300 hover:bg-amber-400 dark:bg-dark-primary dark:hover:bg-dark-primary-hover dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300 dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? <Spinner small /> : 'Submit Report'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-slate-600 shadow-sm px-4 py-2 bg-white dark:bg-dark-surface text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-surface/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemFormModal;