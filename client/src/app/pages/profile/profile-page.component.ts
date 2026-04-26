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
  IonNote, IonBadge, IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
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
    IonNote,
    IonList,
    IonItem,
    IonLabel
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

  protected toggleTheme(event: any) {
    const isDark = typeof event === 'boolean' ? event : event.detail.checked;
    this.themeService.toggleTheme(isDark);
  }

  protected navigateTo(path: string) {
    this.#router.navigate([path]);
  }

  protected logout() {
    console.log('Logout');
    // Implement logout logic
  }
}
