export interface Product {
  id: number;
  nameRu: string;
  nameTj: string;
  nameEn: string;
  price: number;
  unit: string;
  imageUrl: string;
  rating: number;
  categoryId: number;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  emoji: string;
}