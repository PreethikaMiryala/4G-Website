export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  category: string;
  stock: number;
  ingredients?: string | null;
  usage?: string | null;
  benefits?: string | null;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
