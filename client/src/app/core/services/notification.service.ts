import { Injectable, signal, effect } from '@angular/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { Capacitor } from '@capacitor/core';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'promo' | 'system';
  isRead: boolean;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  // Хранилище для токена
  public fcmToken = signal<string | null>(null);
  
  // Список полученных уведомлений
  public notifications = signal<NotificationItem[]>(this.#loadFromStorage());

  constructor() {
    // Автоматическое сохранение в LocalStorage при изменении списка
    effect(() => {
      localStorage.setItem('dastras_notifications', JSON.stringify(this.notifications()));
    });
  }

  /**
   * Инициализация Push-уведомлений
   */
  async initPush() {
    if (!Capacitor.isNativePlatform()) {
      console.log('Push notifications: Web implementation requires VAPID key and Service Worker.');
      // return; 
    }

    try {
      const permission = await FirebaseMessaging.requestPermissions();
      
      if (permission.receive === 'granted') {
        // Для веба передайте ваш VAPID ключ: .getToken({ vapidKey: 'YOUR_VAPID_KEY' })
        const { token } = await FirebaseMessaging.getToken();
        this.fcmToken.set(token);
        console.log('FCM Token:', token);

        this.#setupListeners();
      } else {
        console.warn('Push notifications: Permission denied');
      }
    } catch (error) {
      console.error('Push notifications: Initialization failed', error);
    }
  }

  /**
   * Генерация тестового уведомления (для отладки UI)
   */
  createTestNotification() {
    this.#addNotificationFromPush({
      id: Date.now().toString(),
      title: 'Тестовое уведомление',
      body: 'Это пример того, как будет выглядеть ваше уведомление в списке.',
      data: { type: 'promo' }
    });
  }

  #setupListeners() {
    // Когда приложение открыто
    FirebaseMessaging.addListener('notificationReceived', (event) => {
      console.log('Notification received (Foreground):', event.notification);
      this.#addNotificationFromPush(event.notification);
    });

    // Когда пользователь нажал на уведомление
    FirebaseMessaging.addListener('notificationActionPerformed', (event) => {
      console.log('Notification tapped:', event.notification);
      this.#addNotificationFromPush(event.notification, true);
    });

    FirebaseMessaging.addListener('tokenReceived', (event) => {
      this.fcmToken.set(event.token);
    });
  }

  #addNotificationFromPush(push: any, markAsRead = false) {
    const newItem: NotificationItem = {
      id: push.id || Date.now().toString(),
      title: push.title || 'Уведомление',
      message: push.body || '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: (push.data?.type as any) || 'system',
      isRead: markAsRead,
      data: push.data
    };

    this.notifications.update(list => [newItem, ...list]);
  }

  /**
   * Пометить как прочитанное
   */
  markAsRead(id: string) {
    this.notifications.update(list => 
      list.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  }

  /**
   * Очистить все уведомления
   */
  clearAll() {
    this.notifications.set([]);
  }

  #loadFromStorage(): NotificationItem[] {
    const saved = localStorage.getItem('dastras_notifications');
    return saved ? JSON.parse(saved) : [];
  }

  async deleteToken() {
    await FirebaseMessaging.deleteToken();
    this.fcmToken.set(null);
  }
}
