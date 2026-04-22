import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonIcon, 
  IonButton, 
  IonToggle,
  IonNote, IonBadge } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  locationOutline, 
  cardOutline, 
  notificationsOutline, 
  moonOutline, 
  helpCircleOutline, 
  logOutOutline,
  chevronForwardOutline,
  walletOutline,
  languageOutline
} from 'ionicons/icons';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [IonBadge, 
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonIcon, 
    IonButton, 
    IonToggle,
    IonNote
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  #router = inject(Router);
  protected themeService = inject(ThemeService);

  protected user = signal({
    name: 'Алишер Собиров',
    phone: '+992 900 00 00 00',
    avatar: 'https://i.pravatar.cc/150?u=alisher',
    balance: 150.50
  });

  constructor() {
    addIcons({ 
      personOutline, 
      locationOutline, 
      cardOutline, 
      notificationsOutline, 
      moonOutline, 
      helpCircleOutline, 
      logOutOutline,
      chevronForwardOutline,
      walletOutline,
      languageOutline
    });
  }

  protected toggleTheme(event: any) {
    this.themeService.toggleTheme(event.detail.checked);
  }

  protected navigateTo(path: string) {
    this.#router.navigate([path]);
  }

  protected logout() {
    console.log('Logout');
    // Implement logout logic
  }
}
