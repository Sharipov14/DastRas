import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonIcon, 
  IonButton, 
  IonButtons, 
  IonList, 
  IonItem, 
  IonLabel,
  IonNote
} from "@ionic/angular/standalone";
import { Location } from '@angular/common';
import { NotificationService, NotificationItem } from '../../core/services/notification.service';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonIcon, 
    IonButton, 
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonNote
  ],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPageComponent {
  #location = inject(Location);
  protected notificationService = inject(NotificationService);

  // Получаем список уведомлений напрямую из сервиса
  protected notifications = this.notificationService.notifications;

  protected goBack() {
    this.#location.back();
  }

  protected clearAll() {
    this.notificationService.clearAll();
  }

  protected markAsRead(notification: NotificationItem) {
    this.notificationService.markAsRead(notification.id);
  }

  protected getIconName(type: string): string {
    switch (type) {
      case 'order': return 'receipt-outline';
      case 'promo': return 'gift-outline';
      case 'system': return 'information-circle-outline';
      default: return 'notifications-outline';
    }
  }

  protected getIconColorClass(type: string): string {
    switch (type) {
      case 'order': return 'text-blue-500 bg-blue-50 dark:bg-blue-500/10';
      case 'promo': return 'text-orange-500 bg-orange-50 dark:bg-orange-500/10';
      case 'system': return 'text-purple-500 bg-purple-50 dark:bg-purple-500/10';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-500/10';
    }
  }
}
