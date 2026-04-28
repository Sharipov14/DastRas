import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Product, CreateProductRequest, UpdateProductRequest, CreateCategoryRequest, UpdateCategoryRequest } from '../models/product.model';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  categories = signal<Category[]>([]);
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
    } catch (error) {
      console.error('Error loading products/categories:', error);
    }
  }

  // --- Products CRUD ---

  async addProduct(product: CreateProductRequest) {
    const newProduct = await firstValueFrom(this.http.post<Product>(`${this.apiUrl}/Products`, product));
    this.products.update(prev => [newProduct, ...prev]);
    return newProduct;
  }

  async updateProduct(id: number, product: UpdateProductRequest) {
    const updated = await firstValueFrom(this.http.put<Product>(`${this.apiUrl}/Products/${id}`, product));
    this.products.update(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  }

  async deleteProduct(id: number) {
    await firstValueFrom(this.http.delete(`${this.apiUrl}/Products/${id}`));
    this.products.update(prev => prev.filter(p => p.id !== id));
  }

  // --- Categories CRUD ---

  async addCategory(category: CreateCategoryRequest) {
    const newCategory = await firstValueFrom(this.http.post<Category>(`${this.apiUrl}/Categories`, category));
    this.categories.update(prev => [...prev, newCategory]);
    return newCategory;
  }

  async updateCategory(id: number, category: UpdateCategoryRequest) {
    const updated = await firstValueFrom(this.http.put<Category>(`${this.apiUrl}/Categories/${id}`, category));
    this.categories.update(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  }

  async deleteCategory(id: number) {
    await firstValueFrom(this.http.delete(`${this.apiUrl}/Categories/${id}`));
    this.categories.update(prev => prev.filter(c => c.id !== id));
  }

  private getDescendantCategoryIds(categoryId: number): number[] {
    const allCategories = this.categories();
    const descendants: number[] = [];
    
    const findChildren = (id: number) => {
      const children = allCategories.filter(c => c.parentId === id);
      for (const child of children) {
        descendants.push(child.id);
        findChildren(child.id);
      }
    };
    
    findChildren(categoryId);
    return descendants;
  }

  getFilteredProducts(categoryId: number | null, query: string) {
    let filtered = this.products();
    if (categoryId) {
      const validCategoryIds = [categoryId, ...this.getDescendantCategoryIds(categoryId)];
      filtered = filtered.filter(p => validCategoryIds.includes(p.categoryId));
    }
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
}
