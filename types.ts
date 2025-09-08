export enum ItemType {
  LOST = 'lost',
  FOUND = 'found',
}

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  timestamp: Date;
  contactNumber: string;
}

export interface UserExperience {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  timestamp: Date;
}
