// src/types.ts
export enum ItemType {
  LOST = 'lost',
  FOUND = 'found',
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  // store ISO strings in localStorage, but components can accept Date too
  timestamp: string | Date;
  contactNumber: string;
  ownerId: string;    // new -> who created the item
  retrieved: boolean; // new -> whether owner marked retrieved
}

export interface UserExperience {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  timestamp: Date;
}
