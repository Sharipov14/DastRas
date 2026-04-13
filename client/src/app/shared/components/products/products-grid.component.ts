import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { addIcons } from 'ionicons';
import { add, remove, star, trashOutline } from 'ionicons/icons';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonSkeletonText } from '@ionic/angular/standalone';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { interval } from 'rxjs';

@Component({
    selector: 'app-products-grid',
    standalone: true,
    imports: [IonCardContent,
    IonIcon,
    IonCard,
    IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonSkeletonText],
    templateUrl: './products-grid.component.html',
    styleUrl: './products-grid.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsGridComponent implements OnInit {
    protected products: Product[] = [];
    protected card: { product: Product, quantity: number }[] = [];
    protected isLoading = false;
    protected skeletonItems = Array.from({ length: 6 }, (_, index) => index);

    #router = inject(Router);
    #productService = inject(ProductService);
    #cartService = inject(CartService);
    #detector = inject(ChangeDetectorRef);
    #destroyRef = inject(DestroyRef);
    
    #selectedCategory = this.#productService.selectedCategory;
    protected productt: Product | undefined;

    constructor() {
        addIcons({
            star,
            add,
            remove,
            'trash-outline': trashOutline
        });
        this.productt = this.#productService.getProductById(1);
    }

    ngOnInit(): void {
        this.filteredProducts();
    }

    private filteredProducts(): void {
        this.isLoading = true;
        interval(5000).pipe(
            takeUntilDestroyed(this.#destroyRef)
        ).subscribe(() => {
            this.products = this.#productService.getProductsByCategory(this.#selectedCategory());
            this.isLoading = false;
            this.#detector.markForCheck();
        });
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
