import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonIcon, 
  IonButton,
  IonFooter,
} from '@ionic/angular/standalone';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    CommonModule,
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonIcon, 
    IonButton,
    IonFooter,
  ],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  protected product = signal<Product | undefined>(undefined);
  
  protected quantity = computed(() => {
    const p = this.product();
    if (!p) return 0;
    const cartItem = this.cartService.items().find(item => item.product.id === p.id);
    return cartItem ? cartItem.quantity : 0;
  });

  protected isFavorite = signal(false);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.product.set(this.productService.getProductById(id));
    }
  }

  protected toggleFavorite() {
    this.isFavorite.update(v => !v);
  }

  protected changeQuantity(change: number) {
    const p = this.product();
    if (!p) return;
    
    const currentQty = this.quantity();
    if (currentQty === 0 && change > 0) {
      this.cartService.addToCart(p, 1);
    } else {
      this.cartService.updateQuantity(p.id, currentQty + change);
    }
  }

  protected goToCart() {
    // Navigate to cart page (to be implemented)
    this.router.navigate(['/tabs/orders']); // Temporary redirect to Orders until Cart page is created
  }
}
