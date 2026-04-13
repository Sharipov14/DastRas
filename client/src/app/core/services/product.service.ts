import { Injectable, signal } from '@angular/core';
import { Category, Product, SubCategory } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // Shared state for category selection and search
  selectedCategory = signal<number | null>(null);
  searchQuery = signal<string>('');

  categories = signal<Category[]>([
    { id: 1, name: 'Овощи', emoji: '🥬' },
    { id: 2, name: 'Фрукты', emoji: '🍎' },
    { id: 3, name: 'Молочное', emoji: '🥛' },
    { id: 4, name: 'Мясо', emoji: '🍗' },
    { id: 5, name: 'Выпечка', emoji: '🍞' }
  ]);

  subCategories = signal<SubCategory[]>([
    { id: 101, categoryId: 1, name: 'Сезонные' },
    { id: 102, categoryId: 1, name: 'Зелень' },
    { id: 103, categoryId: 1, name: 'Экзотика' },
    { id: 201, categoryId: 2, name: 'Цитрусовые' },
    { id: 202, categoryId: 2, name: 'Ягоды' },
    { id: 301, categoryId: 3, name: 'Сыры' },
    { id: 302, categoryId: 3, name: 'Йогурты' }
  ]);

  products = signal<Product[]>([
    { id: 1, categoryId: 1, subCategoryId: 101, nameRu: 'Помидоры', nameTj: 'Помидор', nameEn: 'Tomatoes', price: 15, unit: 'кг', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=1', description: 'Свежие, сочные помидоры.' },
    { id: 2, categoryId: 1, subCategoryId: 101, nameRu: 'Огурцы', nameTj: 'Бодиринг', nameEn: 'Cucumbers', price: 12, unit: 'кг', rating: 4.5, imageUrl: 'https://picsum.photos/300/300?random=2', description: 'Хрустящие огурцы.' },
    { id: 9, categoryId: 1, subCategoryId: 102, nameRu: 'Укроп', nameTj: 'Шибит', nameEn: 'Dill', price: 2, unit: 'пучок', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=9', description: 'Свежий укроп.' },
    { id: 10, categoryId: 1, subCategoryId: 102, nameRu: 'Петрушка', nameTj: 'Гандум', nameEn: 'Parsley', price: 2, unit: 'пучок', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=10', description: 'Свежая петрушка.' },
    { id: 3, categoryId: 2, subCategoryId: 201, nameRu: 'Яблоки', nameTj: 'Себ', nameEn: 'Apples', price: 10, unit: 'кг', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=3', description: 'Сладкие красные яблоки.' },
    { id: 4, categoryId: 2, subCategoryId: 201, nameRu: 'Бананы', nameTj: 'Банан', nameEn: 'Bananas', price: 18, unit: 'кг', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=4', description: 'Спелые бананы.' },
    { id: 5, categoryId: 3, subCategoryId: 302, nameRu: 'Молоко', nameTj: 'Шир', nameEn: 'Milk', price: 8, unit: 'л', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=5', description: 'Натуральное молоко 3.2%.' },
    { id: 6, categoryId: 3, subCategoryId: 301, nameRu: 'Сыр', nameTj: 'Паннир', nameEn: 'Cheese', price: 45, unit: 'кг', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=6', description: 'Твердый сыр.' },
    { id: 7, categoryId: 4, subCategoryId: 0, nameRu: 'Говядина', nameTj: 'Гушти гов', nameEn: 'Beef', price: 85, unit: 'кг', rating: 5.0, imageUrl: 'https://picsum.photos/300/300?random=7', description: 'Свежая говядина без костей.' },
    { id: 8, categoryId: 5, subCategoryId: 0, nameRu: 'Хлеб', nameTj: 'Нон', nameEn: 'Bread', price: 4, unit: 'шт', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=8', description: 'Горячий тандырный хлеб.' },
  ]);

  getFilteredProducts(categoryId: number | null, query: string) {
    let filtered = this.products();
    if (categoryId) filtered = filtered.filter(p => p.categoryId === categoryId);
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.nameRu.toLowerCase().includes(q) || 
        p.nameTj.toLowerCase().includes(q) || 
        p.nameEn.toLowerCase().includes(q)
      );
    }
    return filtered;
  }

  getSubCategories(categoryId: number | null): SubCategory[] {
    if (!categoryId) return [];
    return this.subCategories().filter(sc => sc.categoryId === categoryId);
  }

  getProductById(id: number) {
    return this.products().find(p => p.id === id);
  }
}
