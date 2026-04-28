import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonLabel, 
  IonButton, 
  IonIcon,
  IonSegment,
  IonSegmentButton, IonItem } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [IonItem, 
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonLabel, 
    IonButton, 
    IonIcon, 
    IonSegment,
    IonSegmentButton
  ],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent implements OnInit {
  #router = inject(Router);
  #orderService = inject(OrderService);

  protected selectedSegment = signal<'active' | 'past'>('active');

  #allOrders = this.#orderService.orders;

  protected filteredOrders = computed(() => {
    const segment = this.selectedSegment();
    return this.#allOrders().filter(order => {
      const isActive = order.status === 'pending' || order.status === 'processing';
      if (segment === 'active') return isActive;
      return !isActive;
    });
  });

  ngOnInit() {
    this.#orderService.loadOrders();
  }

  protected segmentChanged(event: any) {
    this.selectedSegment.set(event.detail.value);
  }

  protected getStatusLabel(status: string): string {
    switch (status) {
      case 'delivered': return 'Доставлен';
      case 'pending': return 'В пути';
      case 'processing': return 'В обработке';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестно';
    }
  }

  protected getStatusIcon(status: string): string {
    switch (status) {
      case 'delivered': return 'checkmark-circle';
      case 'pending': return 'time-outline';
      case 'processing': return 'timer-outline';
      case 'cancelled': return 'close-circle';
      default: return 'help-circle-outline';
    }
  }

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  protected repeatOrder(orderId: number) {
    console.log('Repeat order', orderId);
  }

  protected viewOrderDetails(orderId: number) {
    this.#router.navigate(['/order', orderId]);
  }
}
