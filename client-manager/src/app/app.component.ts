import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonButton, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  barChartOutline, barChartSharp,
  cubeOutline, cubeSharp, 
  bicycleOutline, bicycleSharp, 
  listOutline, listSharp,
  peopleOutline, peopleSharp,
  settingsOutline, settingsSharp,
  logOutOutline, logOutSharp,
  personCircleOutline, personCircleSharp
} from 'ionicons/icons';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';
import { UserRole } from './core/models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonBadge, CommonModule, RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonButton],
})
export class AppComponent {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService); // Initialized theme

  currentUser = this.authService.currentUser;
  isAuthenticated = computed(() => {
    try {
      return this.authService.isAuthenticated();
    } catch {
      return false;
    }
  });

  public allPages = [
    { title: 'Аналитика', url: '/analytics', icon: 'bar-chart', roles: [UserRole.Admin, UserRole.Manager] },
    { title: 'Сборка заказов', url: '/assembly', icon: 'cube', roles: [UserRole.Admin, UserRole.Manager, UserRole.Assembler] },
    { title: 'Доставка', url: '/delivery', icon: 'bicycle', roles: [UserRole.Admin, UserRole.Manager, UserRole.Courier] },
    { title: 'Товары', url: '/products', icon: 'list', roles: [UserRole.Admin, UserRole.Manager] },
    { title: 'Персонал', url: '/settings/users', icon: 'people', roles: [UserRole.Admin] },
    { title: 'Настройки', url: '/settings', icon: 'settings', roles: [UserRole.Admin, UserRole.Manager, UserRole.Assembler, UserRole.Courier] },
  ];

  public appPages = computed(() => {
    const user = this.currentUser();
    if (!user || !user.role) return [];
    
    return this.allPages.filter(page => {
      // Сравниваем роль, учитывая возможные различия в регистре или типе
      return page.roles && page.roles.some(role => String(role) === String(user.role));
    });
  });

  constructor() {
    addIcons({ 
      barChartOutline, barChartSharp,
      cubeOutline, cubeSharp, 
      bicycleOutline, bicycleSharp, 
      listOutline, listSharp,
      peopleOutline, peopleSharp,
      settingsOutline, settingsSharp,
      logOutOutline, logOutSharp,
      personCircleOutline, personCircleSharp
    });
  }

  logout() {
    this.authService.logout();
  }
}
