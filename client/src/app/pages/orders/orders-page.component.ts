import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
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
  IonSegmentButton
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { 
  receiptOutline, 
  chevronForwardOutline, 
  repeatOutline, 
  checkmarkCircle, 
  timeOutline, 
  closeCircle 
} from 'ionicons/icons';
import { Router } from '@angular/router';

interface OrderHistoryItem {
  id: string;
  date: string;
  status: 'delivered' | 'pending' | 'cancelled';
  totalPrice: number;
  itemsCount: number;
  imageUrl: string;
}

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [
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
export class OrdersPageComponent {
  #router = inject(Router);

  protected selectedSegment = signal<'active' | 'past'>('active');

  #allOrders = signal<OrderHistoryItem[]>([
    {
      id: 'ORD-8821',
      date: 'Сегодня, 14:20',
      status: 'pending',
      totalPrice: 154,
      itemsCount: 5,
      imageUrl: 'https://picsum.photos/200/200?random=10'
    },
    {
      id: 'ORD-9012',
      date: 'Сегодня, 12:45',
      status: 'pending',
      totalPrice: 42,
      itemsCount: 2,
      imageUrl: 'https://picsum.photos/200/200?random=15'
    },
    {
      id: 'ORD-7754',
      date: '20 Апр, 10:15',
      status: 'delivered',
      totalPrice: 85,
      itemsCount: 3,
      imageUrl: 'https://picsum.photos/200/200?random=20'
    },
    {
      id: 'ORD-6612',
      date: '15 Апр, 18:45',
      status: 'delivered',
      totalPrice: 210,
      itemsCount: 8,
      imageUrl: 'https://picsum.photos/200/200?random=30'
    },
    {
      id: 'ORD-5501',
      date: '10 Апр, 09:30',
      status: 'cancelled',
      totalPrice: 45,
      itemsCount: 2,
      imageUrl: 'https://picsum.photos/200/200?random=40'
    }
  ]);

  protected filteredOrders = computed(() => {
    const segment = this.selectedSegment();
    return this.#allOrders().filter(order => {
      if (segment === 'active') return order.status === 'pending';
      return order.status === 'delivered' || order.status === 'cancelled';
    });
  });

  constructor() {
    addIcons({ 
      receiptOutline, 
      chevronForwardOutline, 
      repeatOutline, 
      checkmarkCircle, 
      timeOutline, 
      closeCircle 
    });
  }

  protected segmentChanged(event: any) {
    this.selectedSegment.set(event.detail.value);
  }

  protected getStatusLabel(status: string): string {
    switch (status) {
      case 'delivered': return 'Доставлен';
      case 'pending': return 'В пути';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестно';
    }
  }

  protected getStatusIcon(status: string): string {
    switch (status) {
      case 'delivered': return 'checkmark-circle';
      case 'pending': return 'time-outline';
      case 'cancelled': return 'close-circle';
      default: return 'help-circle-outline';
    }
  }

  protected repeatOrder(orderId: string) {
    console.log('Repeat order', orderId);
  }

  protected viewOrderDetails(orderId: string) {
    this.#router.navigate(['/order', orderId]);
  }
}
