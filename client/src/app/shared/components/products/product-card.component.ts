import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, remove, star, trashOutline } from 'ionicons/icons';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  #cartService = inject(CartService);
  #router = inject(Router);

  constructor() {
    addIcons({ star, add, remove, 'trash-outline': trashOutline });
  }

  protected get quantity(): number {
    const item = this.#cartService.items().find(i => i.product.id === this.product.id);
    return item ? item.quantity : 0;
  }

  protected addToCart(event: Event) {
    event.stopPropagation();
    this.#cartService.addToCart(this.product);
  }

  protected updateQuantity(event: Event, change: number) {
    event.stopPropagation();
    const newQty = this.quantity + change;
    this.#cartService.updateQuantity(this.product.id, newQty);
  }

  protected goToDetails() {
    this.#router.navigate(['/product', this.product.id]);
  }
}
