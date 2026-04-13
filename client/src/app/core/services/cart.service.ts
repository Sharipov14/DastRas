import { computed, Injectable, signal } from '@angular/core';
import { ICartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items = signal<ICartItem[]>([]);

  // Delivery State
  public deliveryTime = signal<string>('30-45 мин');
  public deliveryDay = signal<string>('Сегодня');

  public items = computed(() => this._items());

  public totalItems = computed(() => this._items().reduce((acc, item) => acc + item.quantity, 0));
  
  public totalPrice = computed(() => 
    this._items().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  );

  public addToCart(product: Product, quantity: number = 1) {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i => 
          i.product.id === product.id 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...items, { product, quantity }];
    });
  }

  public removeFromCart(productId: number) {
    this._items.update(items => items.filter(i => i.product.id !== productId));
  }

  public updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this._items.update(items => 
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  public setDeliveryTime(time: string) {
    this.deliveryTime.set(time);
  }

  public setDeliveryInfo(time: string, day: string) {
    this.deliveryTime.set(time);
    this.deliveryDay.set(day);
  }

  public clearCart() {
    this._items.set([]);
  }
}
