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
  AlertController,
  IonList,
  IonLoading
} from "@ionic/angular/standalone";
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { AddressService } from '../../core/services/address.service';

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
    IonList,
    IonLoading
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
  #orderService = inject(OrderService);
  #addressService = inject(AddressService);

  protected paymentMethod = signal<'cash' | 'card' | 'wallet'>('cash');
  protected selectedAddress = this.#addressService.selectedAddress;
  protected isSubmitting = signal(false);

  protected setPaymentMethod(method: any) {
    this.paymentMethod.set(method.detail.value);
  }

  protected async confirmOrder() {
    if (this.cartService.items().length === 0) return;

    this.isSubmitting.set(true);

    const request = {
      addressId: this.selectedAddress()?.id
    };

    const order = await this.#orderService.createOrder(request);
    this.isSubmitting.set(false);

    if (order) {
      const alert = await this.#alertController.create({
        header: 'Заказ принят!',
        message: `Ваш заказ #${order.orderNumber} успешно оформлен и уже готовится к отправке.`,
        buttons: [
          {
            text: 'Отлично',
            handler: () => {
              this.#router.navigate(['/tabs/orders'], { replaceUrl: true });
            }
          }
        ],
        cssClass: 'custom-alert'
      });
      await alert.present();
    } else {
      const alert = await this.#alertController.create({
        header: 'Ошибка',
        message: 'Не удалось оформить заказ. Пожалуйста, попробуйте позже.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  protected changeAddress() {
    this.#router.navigate(['/addresses']);
  }
}
