import { Item, ItemType, UserExperience } from '../types';

// By changing the version, we invalidate the old localStorage data and force a refresh.
const API_VERSION = 'v1.2'; 

// Define keys for localStorage to avoid magic strings and ensure uniqueness
const LOST_ITEMS_KEY = `campus-lost-found-lost-items-${API_VERSION}`;
const FOUND_ITEMS_KEY = `campus-lost-found-found-items-${API_VERSION}`;
const EXPERIENCES_KEY = `campus-lost-found-experiences-${API_VERSION}`;

// --- Initial Mock Data (used only if localStorage is empty or corrupted) ---
const initialLostItems: Item[] = [
  {
    id: 'l1',
    type: ItemType.LOST,
    title: 'Black Hydro Flask Water Bottle',
    description: 'A standard size black Hydro Flask with a few stickers on it, one of a mountain range.',
    category: 'Bottle',
    location: 'Library, 2nd Floor',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=400&auto=format&fit=crop',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    contactNumber: '918088199509',
  },
  {
    id: 'l2',
    type: ItemType.LOST,
    title: 'AirPods Pro in White Case',
    description: 'Standard AirPods Pro charging case. Has a small scratch on the front.',
    category: 'Electronics',
    location: 'Student Union Food Court',
    imageUrl: 'https://images.unsplash.com/photo-1610438235354-a6ae5528385c?q=80&w=400&auto=format&fit=crop',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    contactNumber: '918088199509',
  },
  {
    id: 'l3',
    type: ItemType.LOST,
    title: 'Blue Jansport Backpack',
    description: 'A classic blue Jansport backpack. Contains a chemistry textbook and a laptop.',
    category: 'Bag',
    location: 'Bus Stop near Engineering Building',
    imageUrl: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    contactNumber: '918088199509',
  },
];

const initialFoundItems: Item[] = [
  {
    id: 'f1',
    type: ItemType.FOUND,
    title: 'iPhone 13 with a clear case',
    description: 'An iPhone 13 in a clear case with a flower design on the back. The lock screen is a picture of a cat.',
    category: 'Electronics',
    location: 'Found in Lecture Hall C',
    imageUrl: '/case.png',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    contactNumber: '918088199509',
  },
  {
    id: 'f2',
    type: ItemType.FOUND,
    title: 'Set of keys on a university lanyard',
    description: 'A set of three keys on a blue and gold university lanyard. One key is a car key.',
    category: 'Keys',
    location: 'Turned in at the Campus Center desk',
    imageUrl: '/keys.png',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    contactNumber: '918088199509',
  },
];

const initialUserExperiences: UserExperience[] = [
  {
    id: 'e1',
    name: 'Sarah J.',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarahj',
    rating: 5,
    comment: 'I lost my favorite water bottle and thought it was gone forever. Found it on here the next day! So grateful for this app.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'e2',
    name: 'Mike R.',
    avatarUrl: 'https://i.pravatar.cc/150?u=miker',
    rating: 5,
    comment: 'Found a pair of AirPods and was able to connect with the owner super easily through WhatsApp. The whole process was seamless.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'e3',
    name: 'Jessica Chen',
    avatarUrl: 'https://i.pravatar.cc/150?u=jessicachen',
    rating: 4,
    comment: 'The AI image suggestion is surprisingly accurate and saved me a lot of time when I reported a lost textbook. Great feature!',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  }
];

// Helper function to load data from localStorage or initialize it if it doesn't exist
const loadAndInitializeData = <T extends { timestamp: Date }>(key: string, initialData: T[]): T[] => {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      // Data from localStorage needs to have its date strings converted back to Date objects
      return JSON.parse(storedData).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }));
    } else {
      // If no data is in localStorage, seed it with the initial mock data
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
  } catch (error) {
    console.error(`Error processing data from localStorage for key "${key}". Seeding with initial data.`, error);
    // If parsing fails for any reason, fall back to initial data and reset localStorage
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
};


const MOCK_API_DELAY = 500;

export const getItems = (type: ItemType): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const key = type === ItemType.LOST ? LOST_ITEMS_KEY : FOUND_ITEMS_KEY;
      const initialData = type === ItemType.LOST ? initialLostItems : initialFoundItems;
      const items = loadAndInitializeData(key, initialData);
      resolve([...items].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    }, MOCK_API_DELAY);
  });
};

export const addItem = (itemData: Omit<Item, 'id' | 'timestamp'>): Promise<Item> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const key = itemData.type === ItemType.LOST ? LOST_ITEMS_KEY : FOUND_ITEMS_KEY;
      const initialData = itemData.type === ItemType.LOST ? initialLostItems : initialFoundItems;
      const items = loadAndInitializeData(key, initialData);
      
      const newItem: Item = {
        ...itemData,
        id: `${itemData.type.charAt(0)}${Date.now()}`,
        timestamp: new Date(),
      };

      const updatedItems = [newItem, ...items];
      localStorage.setItem(key, JSON.stringify(updatedItems));
      resolve(newItem);
    }, MOCK_API_DELAY);
  });
};

export const getExperiences = (): Promise<UserExperience[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const experiences = loadAndInitializeData(EXPERIENCES_KEY, initialUserExperiences);
      resolve([...experiences].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    }, MOCK_API_DELAY);
  });
};

export const addExperience = (experienceData: Omit<UserExperience, 'id' | 'timestamp' | 'avatarUrl'>): Promise<UserExperience> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let experiences = loadAndInitializeData(EXPERIENCES_KEY, initialUserExperiences);
      const newExperience: UserExperience = {
        ...experienceData,
        id: `e${Date.now()}`,
        timestamp: new Date(),
        avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}` // Random avatar for mock
      };
      experiences = [newExperience, ...experiences];
      localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(experiences));
      resolve(newExperience);
    }, MOCK_API_DELAY);
  });
};