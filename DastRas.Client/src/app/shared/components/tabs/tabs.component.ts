import { Component, inject, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { grid, home, person, receipt, time, chevronDown, cart } from 'ionicons/icons';
import { CartService } from '../../../core/services/cart.service';
import { ModalController } from '@ionic/angular';
import { DeliveryModalComponent } from '../delivery-modal/delivery-modal.component';
@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonLabel, IonTabButton, IonTabBar, IonTabs, IonIcon],
  providers: [ModalController]
})
export class TabsComponent  implements OnInit {

  protected cartService = inject(CartService);

  #modalController = inject(ModalController);

  constructor() { 
    addIcons({time,chevronDown,cart,home,grid,receipt,person});
  }

  ngOnInit() {}

  protected async openModal() {
    console.log('open modal');
    const modal = await this.#modalController.create({
      component: DeliveryModalComponent,
      breakpoints: [0, 0.5, 0.75, 1],
      initialBreakpoint: 0.5,
      cssClass: 'custom-modal',
      handle: false
    });
    
    await modal.present();
  }
}
