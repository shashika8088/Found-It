import React from 'react';
import { Item, ItemType, User } from '../types';
import ItemCard from './ItemCard';
import Spinner from './Spinner';

interface ItemListProps {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  itemType: ItemType;
  isSearchResult: boolean;
  searchQuery: string;
  currentUser?: User | null;
  onRetrieve?: (id: string) => void;
  onDelete?: (id: string) => void;   // ✅ NEW PROP
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  isLoading,
  error,
  itemType,
  isSearchResult,
  searchQuery,
  currentUser,
  onRetrieve,
  onDelete,     // ← accept callback
}) => {
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (items.length === 0) {
    if (isSearchResult) {
      return (
        <div className="text-center py-16 px-4">
          <p className="text-2xl text-text-muted dark:text-dark-text-muted font-serif">No Matches Found</p>
          <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
            Try searching with different keywords for "{searchQuery}".
          </p>
        </div>
      );
    }
    return (
      <div className="text-center py-16 px-4">
        <p className="text-2xl text-text-muted dark:text-dark-text-muted font-serif">It's quiet here...</p>
        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
          No {itemType} items have been reported yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      {isSearchResult && (
        <h2 className="text-lg font-semibold text-text dark:text-dark-text mb-4">
          Found {items.length} matching {items.length === 1 ? 'item' : 'items'} for "{searchQuery}"
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            item={item}
            style={{ animationDelay: `${index * 50}ms` }}
            currentUser={currentUser}
            onRetrieve={onRetrieve}
            onDelete={onDelete}    // ✅ PASS TO ITEMCARD
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
