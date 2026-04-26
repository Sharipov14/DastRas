import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

interface CartItemDto {
  id: number;
  productId: number;
  productNameRu: string;
  productImageUrl: string;
  productPrice: number;
  productUnit: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Cart`;
  private _items = signal<ICartItem[]>([]);

  // Delivery State
  public deliveryTime = signal<string>('30-45 мин');
  public deliveryDay = signal<string>('Сегодня');

  public items = computed(() => this._items());

  public totalItems = computed(() => this._items().reduce((acc, item) => acc + item.quantity, 0));
  
  public totalPrice = computed(() => 
    this._items().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  );

  constructor() {
    this.loadCart();
  }

  private async loadCart() {
    try {
      const dtos = await firstValueFrom(this.http.get<CartItemDto[]>(this.apiUrl));
      this._items.set(dtos.map(dto => this.mapDtoToItem(dto)));
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  public async addToCart(product: Product, quantity: number = 1) {
    try {
      const dto = await firstValueFrom(this.http.post<CartItemDto>(`${this.apiUrl}/items`, {
        productId: product.id,
        quantity
      }));
      
      this._items.update(items => {
        const existingIndex = items.findIndex(i => i.product.id === product.id);
        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex] = this.mapDtoToItem(dto);
          return updated;
        }
        return [...items, this.mapDtoToItem(dto)];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  public async removeFromCart(productId: number) {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/items/${productId}`));
      this._items.update(items => items.filter(i => i.product.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }

  public async updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      await this.removeFromCart(productId);
      return;
    }

    try {
      const dto = await firstValueFrom(this.http.put<CartItemDto>(`${this.apiUrl}/items/${productId}`, {
        quantity
      }));
      
      this._items.update(items => 
        items.map(i => i.product.id === productId ? this.mapDtoToItem(dto) : i)
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  public setDeliveryTime(time: string) {
    this.deliveryTime.set(time);
  }

  public setDeliveryInfo(time: string, day: string) {
    this.deliveryTime.set(time);
    this.deliveryDay.set(day);
  }

  public async clearCart() {
    try {
      await firstValueFrom(this.http.delete(this.apiUrl));
      this._items.set([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  private mapDtoToItem(dto: CartItemDto): ICartItem {
    return {
      product: {
        id: dto.productId,
        nameRu: dto.productNameRu,
        imageUrl: dto.productImageUrl,
        price: dto.productPrice,
        unit: dto.productUnit,
        // Fill other fields with default/dummy if needed, as DTO doesn't have everything
        categoryId: 0, 
        nameTj: dto.productNameRu,
        nameEn: dto.productNameRu,
        rating: 0,
        description: ''
      },
      quantity: dto.quantity
    };
  }
}
