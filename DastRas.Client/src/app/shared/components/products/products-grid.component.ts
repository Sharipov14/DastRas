import { ChangeDetectionStrategy, Component, inject, Input, input } from '@angular/core';
import { addIcons } from 'ionicons';
import { IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent } from '@ionic/angular/standalone';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';

@Component({
    selector: 'app-products-grid',
    standalone: true,
    imports: [IonCardContent,
    IonIcon,
    IonCard,
    IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent],
    templateUrl: './products-grid.component.html',
    styleUrl: './products-grid.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsGridComponent {

    protected card: { product: Product, quantity: number }[] = [];

    #router = inject(Router);
    #productService = inject(ProductService);
    #cartService = inject(CartService);
    
    #selectedCategory = this.#productService.selectedCategory;
    protected productt: Product | undefined;

    constructor () {
        addIcons({
            
        });
        this.productt = this.#productService.getProductById(1);
    }

    protected filteredProducts(): Product[] {
        return this.#productService.getProductsByCategory(this.#selectedCategory());
    }

    protected goToProduct(id: number): void {
        this.#router.navigate(['/product', id]);
    }

    protected getQuantity(productId: number): number {
        const item = this.#cartService.items().find(i => i.product.id === productId);
        return item ? item.quantity : 0;
    }

    protected addToCart(product: Product) {
        this.#cartService.addToCart(product);
    }

    protected updateQuantity(productId: number, change: number) {
        const currentQty = this.getQuantity(productId);
        const newQty = currentQty + change;
        this.#cartService.updateQuantity(productId, newQty);
    }
}