export interface Category {
  id: number;
  name: string;
  emoji: string;
}

export interface SubCategory {
  id: number;
  categoryId: number;
  name: string;
}

export interface Product {
  id: number;
  categoryId: number;
  subCategoryId?: number; // Опционально, пока нет на сервере
  nameRu: string;
  nameTj: string;
  nameEn: string;
  price: number;
  unit: string;
  rating: number;
  imageUrl: string;
  description: string;
}
