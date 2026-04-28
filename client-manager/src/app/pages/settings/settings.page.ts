import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonList, IonItem, IonLabel, IonIcon, IonToggle,
  IonButton, IonCard, IonCardContent, IonAvatar, IonBadge, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  moonOutline, personOutline, logOutOutline, 
  languageOutline, shieldCheckmarkOutline 
} from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: true,
  imports: [IonBadge, 
    CommonModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, 
    IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, 
    IonToggle, IonButton, IonCard, IonCardContent, IonAvatar
  ]
})
export class SettingsPage {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  currentUser = this.authService.currentUser;
  isDarkMode = this.themeService.isDarkMode;

  constructor() {
    addIcons({ 
      moonOutline, personOutline, logOutOutline, 
      languageOutline, shieldCheckmarkOutline 
    });
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  logout() {
    this.authService.logout();
  }
}
