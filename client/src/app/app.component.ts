import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";
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
  fitnessOutline
} from 'ionicons/icons';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DastRas';
  // Injecting to ensure constructor runs and applies theme immediately
  themeService = inject(ThemeService);

  constructor() {
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
      fitnessOutline
    });
  }
}
