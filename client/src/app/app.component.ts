import { Component, inject, signal } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/angular/standalone";
import { ThemeService } from './shared/services/theme.service';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { 
  chevronBack, 
  heartOutline, 
  heart, 
  shareSocialOutline, 
  star, 
  add, 
  remove, 
  trashOutline,
  timeOutline,
  flameOutline,
  leafOutline,
  fitnessOutline,
  arrowBack,
  pencil,
  checkmark,
  createOutline,
  checkmarkCircleOutline,
  locationOutline,
  homeOutline,
  businessOutline
} from 'ionicons/icons';
import { filter, firstValueFrom } from 'rxjs';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonLoading],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DastRas';

  #router = inject(Router);
  #themeService = inject(ThemeService);

  protected isNavigating = signal(false);
  protected isAppLoading = signal(true);

  constructor() {
    this.#setupRouterTracking();
    this.#initializeApp();

    addIcons({
      chevronBack,
      heartOutline,
      heart,
      shareSocialOutline,
      star,
      add,
      remove,
      trashOutline,
      timeOutline,
      flameOutline,
      leafOutline,
      fitnessOutline,
      arrowBack,
      pencil,
      checkmark,
      createOutline,
      checkmarkCircleOutline,
      locationOutline,
      homeOutline,
      businessOutline
    });
  }

  async #initializeApp() {
    // 1. Minimum branding time (1.5 seconds)
    const minTime = new Promise(resolve => setTimeout(resolve, 1500));

    // 2. Wait for the initial navigation to complete
    const initialNav = firstValueFrom(
      this.#router.events.pipe(
        filter(event => 
          event instanceof NavigationEnd || 
          event instanceof NavigationCancel || 
          event instanceof NavigationError
        )
      )
    );

    // Wait for both conditions to be met
    try {
      await Promise.all([minTime, initialNav]);
    } catch (e) {
      console.error('App initialization error', e);
    } finally {
      this.isAppLoading.set(false);
    }
  }

  #setupRouterTracking() {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isNavigating.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isNavigating.set(false);
      }
    });
  }
}
