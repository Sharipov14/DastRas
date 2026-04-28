import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonList, IonItem, IonLabel, IonBadge, 
  IonButton, IonIcon, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bicycleOutline, checkmarkDoneOutline, mapOutline, callOutline } from 'ionicons/icons';
import { OrderService } from '../../core/services/order.service';
import { Order, OrderStatus } from '../../core/models/order.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, 
    IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, 
    IonButton, IonIcon, IonCard, IonCardHeader, 
    IonCardTitle, IonCardContent, IonRefresher, IonRefresherContent
  ]
})
export class DeliveryPage implements OnInit {
  private orderService = inject(OrderService);
  
  deliveringOrders = computed(() => this.orderService.getOrdersByStatus(OrderStatus.Delivering));

  constructor() {
    addIcons({ bicycleOutline, checkmarkDoneOutline, mapOutline, callOutline });
  }

  ngOnInit() {
    this.orderService.loadOrders();
  }

  async handleRefresh(event: any) {
    await this.orderService.loadOrders();
    event.target.complete();
  }

  async finishDelivery(orderId: number) {
    if (confirm('Заказ доставлен покупателю?')) {
      await this.orderService.updateOrderStatus(orderId, OrderStatus.Delivered);
    }
  }

  openMap(address: string) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  }

  callCustomer(phone: string) {
    window.open(`tel:${phone}`, '_system');
  }
}
