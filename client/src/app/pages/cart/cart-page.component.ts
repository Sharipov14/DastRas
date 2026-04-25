import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonButton, 
  IonIcon, 
  IonButtons, 
  IonBackButton, 
  IonFooter,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/angular/standalone";
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonButton, 
    IonIcon, 
    IonButtons, 
    IonBackButton, 
    IonFooter,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {
  protected cartService = inject(CartService);
  #router = inject(Router);

  protected increaseQuantity(productId: number, currentQty: number) {
    this.cartService.updateQuantity(productId, currentQty + 1);
  }

  protected decreaseQuantity(productId: number, currentQty: number) {
    this.cartService.updateQuantity(productId, currentQty - 1);
  }

  protected removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  protected clearCart() {
    this.cartService.clearCart();
  }

  protected checkout() {
    this.#router.navigate(['/checkout']);
  }

  protected goToHome() {
    this.#router.navigate(['/tabs/home']);
  }
}
