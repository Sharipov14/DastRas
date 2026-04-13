import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { IonContent, IonSkeletonText } from '@ionic/angular/standalone';
import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from './product-card.component';

@Component({
    selector: 'app-products-grid',
    standalone: true,
    imports: [
        IonContent, 
        IonSkeletonText,
        ProductCardComponent
    ],
    templateUrl: './products-grid.component.html',
    styleUrl: './products-grid.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsGridComponent {
    #productService = inject(ProductService);

    protected isLoading = false;
    protected skeletonItems = Array.from({ length: 6 }, (_, index) => index);

    protected products = computed(() => {
        const categoryId = this.#productService.selectedCategory();
        const query = this.#productService.searchQuery();
        return this.#productService.getFilteredProducts(categoryId, query);
    });
}
