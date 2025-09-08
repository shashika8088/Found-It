import React, { useRef, useEffect, useState, TextareaHTMLAttributes, ChangeEvent } from 'react';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({ value, onChange, maxLength, className, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(String(value || '').length);

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to shrink if needed
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  
  // Update character count
  useEffect(() => {
    setCharCount(String(value || '').length);
  }, [value]);

  const counterColorClass = maxLength && charCount > maxLength * 0.9
    ? 'text-amber-600 dark:text-amber-400'
    : 'text-text-muted dark:text-dark-text-muted';

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`
          block w-full resize-none overflow-hidden rounded-lg border 
          border-slate-300/70 dark:border-slate-700/70 
          bg-surface/50 dark:bg-dark-surface/80 
          px-4 py-3 text-base text-text dark:text-dark-text 
          placeholder:text-text-muted dark:placeholder:text-dark-text-muted 
          transition-all duration-200 ease-in-out
          focus:border-primary dark:focus:border-dark-primary 
          focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-primary/20
          focus:outline-none
          ${className || ''}
        `}
        {...props}
      />
      {maxLength && (
        <div className={`absolute bottom-2 right-3 text-xs font-medium transition-colors ${counterColorClass}`}>
          {charCount}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default Textarea;