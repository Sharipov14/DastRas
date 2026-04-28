import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
  IonContent, IonList, IonItem, IonLabel, IonInput, IonButton,
  IonIcon, IonAvatar, IonLoading, IonToast
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, callOutline, lockClosedOutline, saveOutline, cameraOutline } from 'ionicons/icons';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonButtons, 
    IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonAvatar, IonLoading, IonToast
  ]
})
export class ProfilePage implements OnInit {
  private authService = inject(AuthService);

  formData = {
    name: '',
    phone: '',
    password: '',
    avatarUrl: ''
  };

  isLoading = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  constructor() {
    addIcons({ personOutline, callOutline, lockClosedOutline, saveOutline, cameraOutline });
  }

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user) {
      this.formData.name = user.name || '';
      this.formData.phone = user.phone;
      this.formData.avatarUrl = user.avatarUrl || '';
    }
  }

  async onSave() {
    if (!this.formData.name || !this.formData.phone) {
      this.errorMessage.set('Имя и телефон обязательны для заполнения');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.updateProfile({
        name: this.formData.name,
        phone: this.formData.phone,
        password: this.formData.password || undefined,
        avatarUrl: this.formData.avatarUrl || undefined
      });
      this.isSuccess.set(true);
      this.formData.password = ''; // Сбрасываем поле пароля после сохранения
    } catch (error: any) {
      console.error('Update profile error:', error);
      this.errorMessage.set(error.error?.message || 'Ошибка при обновлении профиля');
    } finally {
      this.isLoading.set(false);
    }
  }
}
