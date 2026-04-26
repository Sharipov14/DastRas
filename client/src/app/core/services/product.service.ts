import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Product, SubCategory } from '../models/product.model';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  categories = signal<Category[]>([]);
  subCategories = signal<SubCategory[]>([]);
  products = signal<Product[]>([]);

  constructor() {
    this.loadInitialData();
  }

  async loadInitialData() {
    try {
      const [categories, products] = await Promise.all([
        firstValueFrom(this.http.get<Category[]>(`${this.apiUrl}/Categories`)),
        firstValueFrom(this.http.get<Product[]>(`${this.apiUrl}/Products`))
      ]);
      this.categories.set(categories);
      this.products.set(products);
      // Note: Subcategories are not yet supported by the server API
      this.subCategories.set([]);
    } catch (error) {
      console.error('Error loading products/categories:', error);
    }
  }

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
