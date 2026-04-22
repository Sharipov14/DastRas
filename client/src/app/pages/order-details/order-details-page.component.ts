import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonIcon, 
  IonButtons, 
  IonBackButton, 
  IonFooter,
  IonButton
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { 
  receiptOutline, 
  locationOutline, 
  timeOutline, 
  callOutline, 
  chatbubbleEllipsesOutline,
  repeatOutline,
  checkmarkCircle,
  radioButtonOffOutline,
  radioButtonOnOutline,
  closeCircle
} from 'ionicons/icons';

interface OrderDetail {
  id: string;
  date: string;
  status: 'pending' | 'preparing' | 'shipping' | 'delivered' | 'cancelled';
  items: { name: string, quantity: number, price: number, imageUrl: string }[];
  deliveryAddress: string;
  totalPrice: number;
  deliveryFee: number;
  paymentMethod: string;
}

@Component({
  selector: 'app-order-details-page',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton, 
    IonIcon, 
    IonButtons, 
    IonBackButton, 
    IonFooter
  ],
  templateUrl: './order-details-page.component.html',
  styleUrl: './order-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsPageComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  protected order = signal<OrderDetail | null>(null);

  protected statusSteps = [
    { key: 'pending', label: 'Принят', icon: 'radioButtonOnOutline' },
    { key: 'preparing', label: 'Сборка', icon: 'time-outline' },
    { key: 'shipping', label: 'В пути', icon: 'location-outline' },
    { key: 'delivered', label: 'Доставлен', icon: 'checkmark-circle' }
  ];

  constructor() {
    addIcons({ 
      receiptOutline, 
      locationOutline, 
      timeOutline, 
      callOutline, 
      chatbubbleEllipsesOutline,
      repeatOutline,
      checkmarkCircle,
      radioButtonOffOutline,
      radioButtonOnOutline,
      closeCircle
    });
  }

  ngOnInit() {
    const id = this.#route.snapshot.paramMap.get('id');
    // Mock logic: if ID contains 'cancelled', show cancelled status
    const isCancelled = id?.includes('5501'); 
    
    this.order.set({
      id: id || 'ORD-8821',
      date: '22 Апр 2026, 14:20',
      status: isCancelled ? 'cancelled' : 'shipping',
      items: [
        { name: 'Помидоры Черри', quantity: 2, price: 15, imageUrl: 'https://picsum.photos/200/200?random=1' },
        { name: 'Молоко 3.2%', quantity: 1, price: 8, imageUrl: 'https://picsum.photos/200/200?random=5' },
        { name: 'Хлеб тандырный', quantity: 3, price: 4, imageUrl: 'https://picsum.photos/200/200?random=8' }
      ],
      deliveryAddress: 'ул. Рудаки, 45, кв. 12',
      totalPrice: 154,
      deliveryFee: 0,
      paymentMethod: 'Наличными'
    });
  }

  protected getStatusStepIndex(status: string): number {
    if (status === 'cancelled') return -1;
    return this.statusSteps.findIndex(s => s.key === status);
  }

  protected getProgressWidth(): number {
    const currentStatus = this.order()?.status;
    if (!currentStatus || currentStatus === 'cancelled') return 0;
    
    const index = this.getStatusStepIndex(currentStatus);
    if (index <= 0) return 0;
    return (index / (this.statusSteps.length - 1)) * 100;
  }

  protected repeatOrder() {
    console.log('Repeat order');
  }

  protected contactSupport() {
    console.log('Contact support');
  }
}
