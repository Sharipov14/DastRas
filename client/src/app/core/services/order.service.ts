import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { CreateOrderRequest, Order } from '../models/order.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  private apiUrl = `${environment.apiUrl}/Orders`;

  public orders = signal<Order[]>([]);

  constructor() {
    this.loadOrders();
  }

  public async loadOrders() {
    try {
      const data = await firstValueFrom(this.http.get<Order[]>(this.apiUrl));
      this.orders.set(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  }

  public async getOrderById(id: number): Promise<Order | null> {
    try {
      return await firstValueFrom(this.http.get<Order>(`${this.apiUrl}/${id}`));
    } catch (error) {
      console.error('Error loading order by id:', error);
      return null;
    }
  }

  public async createOrder(request: CreateOrderRequest): Promise<Order | null> {
    try {
      const order = await firstValueFrom(this.http.post<Order>(this.apiUrl, request));
      
      // Update local orders list
      this.orders.update(orders => [order, ...orders]);
      
      // Clear cart after successful order
      await this.cartService.clearCart();
      
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  }
}
