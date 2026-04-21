import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { time, chevronDown, cart } from 'ionicons/icons';
import { CartService } from '../../../core/services/cart.service';
import { DeliveryModalComponent } from '../delivery-modal/delivery-modal.component';

@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, IonIcon],
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ModalController]
})
export class MiniCartComponent {
  protected cartService = inject(CartService);
  #modalController = inject(ModalController);

  constructor() {
    addIcons({ time, 'chevron-down': chevronDown, cart });
  }

  protected async openDeliveryModal() {
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
