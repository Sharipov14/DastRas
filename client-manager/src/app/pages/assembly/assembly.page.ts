import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonList, IonItem, IonLabel, IonBadge, 
  IonButton, IonIcon, IonCheckbox, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, cubeOutline, alertCircleOutline } from 'ionicons/icons';
import { OrderService } from '../../core/services/order.service';
import { Order, OrderStatus } from '../../core/models/order.model';

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.page.html',
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, 
    IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, 
    IonButton, IonIcon, IonCheckbox, IonCard, IonCardHeader, 
    IonCardTitle, IonCardContent, IonRefresher, IonRefresherContent
  ]
})
export class AssemblyPage implements OnInit {
  private orderService = inject(OrderService);
  
  preparingOrders = computed(() => this.orderService.getOrdersByStatus(OrderStatus.Preparing));

  constructor() {
    addIcons({ checkmarkCircleOutline, cubeOutline, alertCircleOutline });
  }

  ngOnInit() {
    this.orderService.loadOrders();
  }

  async handleRefresh(event: any) {
    await this.orderService.loadOrders();
    event.target.complete();
  }

  async finishAssembly(orderId: number) {
    if (confirm('Все товары собраны? Заказ будет передан в доставку.')) {
      await this.orderService.updateOrderStatus(orderId, OrderStatus.Delivering);
    }
  }

  toggleItemAssembly(item: any) {
    item.isAssembled = !item.isAssembled;
  }

  isOrderReady(order: Order): boolean {
    return order.items.every(item => item.isAssembled);
  }
}
