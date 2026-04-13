import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";
import { ThemeService } from './shared/services/theme.service';

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
}
