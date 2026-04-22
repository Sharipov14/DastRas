import { ChangeDetectionStrategy, Component, inject, computed, input, signal, effect, untracked } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';
import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from './product-card.component';

@Component({
    selector: 'app-products-grid',
    standalone: true,
    imports: [
        IonSkeletonText,
        ProductCardComponent
    ],
    templateUrl: './products-grid.component.html',
    styleUrl: './products-grid.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsGridComponent {
    #productService = inject(ProductService);

    // Inputs for filtering
    categoryId = input<number | null>(null);
    searchQuery = input<string>('');
    
    // External loading control
    isLoadingInput = input<boolean | null>(null, { alias: 'isLoading' });

    // Internal loading state
    #internalLoading = signal(false);

    // Combined loading state
    protected isLoading = computed(() => {
        const external = this.isLoadingInput();
        return external !== null ? external : this.#internalLoading();
    });

    protected skeletonItems = Array.from({ length: 6 }, (_, index) => index);

    protected products = computed(() => {
        // If loading, return empty to avoid showing products while skeleton is active
        if (this.isLoading()) return [];
        return this.#productService.getFilteredProducts(this.categoryId(), this.searchQuery());
    });

    constructor() {
        // Simulate loading when filters change
        effect(() => {
            // Track inputs
            this.categoryId();
            this.searchQuery();
            
            // Start simulation
            untracked(() => {
                this.#internalLoading.set(true);
                setTimeout(() => {
                    this.#internalLoading.set(false);
                }, 800); // 800ms simulation
            });
        });
    }
}
