export interface ApiSize {
  _id: string;
  name: string;
  sortOrder: number;
}

interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
}

interface ApiStyle {
  _id: string;
  name: string;
}

export interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  category: ApiCategory;
  style: ApiStyle;
  sizes: ApiSize[];
  description: string;
  price: number;
  images: string[];
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  badge?: string;
}