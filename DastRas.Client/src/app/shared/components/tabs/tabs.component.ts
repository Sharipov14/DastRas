import { Component, inject, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { grid, home, person, receipt, time, chevronDown, cart } from 'ionicons/icons';
import { CartService } from '../../../core/services/cart.service';
@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonLabel, IonTabButton, IonTabBar, IonTabs, IonIcon],
})
export class TabsComponent  implements OnInit {

  protected cartService = inject(CartService);

  constructor() { 
    addIcons({time,chevronDown,cart,home,grid,receipt,person});
  }

  ngOnInit() {}
}
