import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonButton, 
  IonIcon, 
  IonButtons, 
  IonBackButton, 
  IonFooter,
  IonRadioGroup,
  IonRadio,
  AlertController
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { 
  locationOutline, 
  timeOutline, 
  cardOutline, 
  cashOutline, 
  chevronForwardOutline, 
  checkmarkCircleOutline,
  walletOutline
} from 'ionicons/icons';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonLabel, 
    IonButton, 
    IonIcon, 
    IonButtons, 
    IonBackButton, 
    IonFooter,
    IonRadioGroup,
    IonRadio,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AlertController]
})
export class CheckoutPageComponent {
  protected cartService = inject(CartService);
  #router = inject(Router);
  #alertController = inject(AlertController);

  protected paymentMethod = signal<'cash' | 'card' | 'wallet'>('cash');
  protected selectedAddress = signal('ул. Рудаки, 45, кв. 12'); // Mock address

  constructor() {

    addIcons({ 
      locationOutline, 
      timeOutline, 
      cardOutline, 
      cashOutline, 
      chevronForwardOutline, 
      checkmarkCircleOutline,
      walletOutline
    });
  }

  protected setPaymentMethod(method: any) {
    this.paymentMethod.set(method.detail.value);
  }

  protected async confirmOrder() {
    // Show success alert
    const alert = await this.#alertController.create({
      header: 'Заказ принят!',
      message: 'Ваш заказ успешно оформлен и уже готовится к отправке.',
      buttons: [
        {
          text: 'Отлично',
          handler: () => {
            this.cartService.clearCart();
            this.#router.navigate(['/tabs/home'], { replaceUrl: true });
          }
        }
      ],
      cssClass: 'custom-alert'
    });

    await alert.present();
  }

  protected changeAddress() {
    // Future: open addresses management
    console.log('Change address');
  }
}
