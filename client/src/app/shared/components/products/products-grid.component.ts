import { ChangeDetectionStrategy, Component, inject, computed, input } from '@angular/core';
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

    protected isLoading = false;
    protected skeletonItems = Array.from({ length: 6 }, (_, index) => index);

    protected products = computed(() => {
        return this.#productService.getFilteredProducts(this.categoryId(), this.searchQuery());
    });
}
