import { Injectable, signal } from '@angular/core';
import { Category, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // Shared state for category selection
  selectedCategory = signal<number | null>(null);

  categories = signal<Category[]>([
    { id: 1, name: 'Овощи', emoji: '🥬' },
    { id: 2, name: 'Фрукты', emoji: '🍎' },
    { id: 3, name: 'Молочное', emoji: '🥛' },
    { id: 4, name: 'Мясо', emoji: '🍗' },
    { id: 5, name: 'Выпечка', emoji: '🍞' }
  ]);

  products = signal<Product[]>([
    { id: 1, categoryId: 1, nameRu: 'Помидоры', nameTj: 'Помидор', nameEn: 'Tomatoes', price: 15, unit: 'кг', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=1', description: 'Свежие, сочные помидоры.' },
    { id: 2, categoryId: 1, nameRu: 'Огурцы', nameTj: 'Бодиринг', nameEn: 'Cucumbers', price: 12, unit: 'кг', rating: 4.5, imageUrl: 'https://picsum.photos/300/300?random=2', description: 'Хрустящие огурцы.' },
    { id: 3, categoryId: 2, nameRu: 'Яблоки', nameTj: 'Себ', nameEn: 'Apples', price: 10, unit: 'кг', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=3', description: 'Сладкие красные яблоки.' },
    { id: 4, categoryId: 2, nameRu: 'Бананы', nameTj: 'Банан', nameEn: 'Bananas', price: 18, unit: 'кг', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=4', description: 'Спелые бананы.' },
    { id: 5, categoryId: 3, nameRu: 'Молоко', nameTj: 'Шир', nameEn: 'Milk', price: 8, unit: 'л', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=5', description: 'Натуральное молоко 3.2%.' },
    { id: 6, categoryId: 3, nameRu: 'Сыр', nameTj: 'Паннир', nameEn: 'Cheese', price: 45, unit: 'кг', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=6', description: 'Твердый сыр.' },
    { id: 7, categoryId: 4, nameRu: 'Говядина', nameTj: 'Гушти гов', nameEn: 'Beef', price: 85, unit: 'кг', rating: 5.0, imageUrl: 'https://picsum.photos/300/300?random=7', description: 'Свежая говядина без костей.' },
    { id: 8, categoryId: 5, nameRu: 'Хлеб', nameTj: 'Нон', nameEn: 'Bread', price: 4, unit: 'шт', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=8', description: 'Горячий тандырный хлеб.' },
  ]);

  getProductsByCategory(categoryId: number | null) {
    if (!categoryId) return this.products();
    return this.products().filter(p => p.categoryId === categoryId);
  }

  getProductById(id: number) {
    return this.products().find(p => p.id === id);
  }
}