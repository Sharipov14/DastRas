import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonItem, 
  IonLabel, IonInput, IonButton, IonIcon, IonText, IonLoading
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, personOutline } from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, 
    IonTitle, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonText, IonLoading
  ]
})
export class LoginPage {
  private authService = inject(AuthService);

  username = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  constructor() {
    addIcons({ lockClosedOutline, personOutline });
  }

  async onLogin() {
    if (!this.username() || !this.password()) {
      this.errorMessage.set('Введите логин и пароль');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.loginWithPassword(this.username(), this.password());
    } catch (error: any) {
      console.error('Login error details:', error);
      if (error.status === 0) {
        this.errorMessage.set('Сервер недоступен. Проверьте соединение или URL API.');
      } else {
        this.errorMessage.set(error.error?.message || 'Ошибка входа. Проверьте логин и пароль.');
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
