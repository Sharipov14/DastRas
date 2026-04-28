export interface Category {
  id: number;
  name: string;
  emoji: string;
  parentId?: number;
}

export interface Product {
  id: number;
  categoryId: number;
  nameRu: string;
  nameTj: string;
  nameEn: string;
  price: number;
  stockQuantity: number;
  unit: string;
  rating: number;
  imageUrl: string;
  description: string;
}

export interface CreateProductRequest {
  nameRu: string;
  nameTj: string;
  nameEn: string;
  price: number;
  stockQuantity: number;
  unit: string;
  imageUrl: string;
  description?: string;
  categoryId: number;
}

export interface UpdateProductRequest extends CreateProductRequest {}

export interface CreateCategoryRequest {
  name: string;
  emoji: string;
  parentId?: number;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {}
