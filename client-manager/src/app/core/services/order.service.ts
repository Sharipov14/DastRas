import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, OrderStatus } from '../models/order.model';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  orders = signal<Order[]>([]);

  async loadOrders() {
    try {
      const orders = await firstValueFrom(this.http.get<Order[]>(`${this.apiUrl}/Orders`));
      this.orders.set(orders);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  }

  async updateOrderStatus(orderId: number, status: OrderStatus) {
    try {
      await firstValueFrom(this.http.patch(`${this.apiUrl}/Orders/${orderId}/status`, { status }));
      this.orders.update(prev => 
        prev.map(o => o.id === orderId ? { ...o, status } : o)
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

  getOrdersByStatus(status: OrderStatus) {
    return this.orders().filter(o => o.status === status);
  }
}
