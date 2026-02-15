import { ChangeDetectionStrategy, Component, inject, Input, input } from "@angular/core";
import { addIcons } from 'ionicons';
import { IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent } from "@ionic/angular/standalone";
import { ProductService } from "../../../core/services/product.service";
import { Router } from "@angular/router";
import { Product } from "../../../core/models/product.model";

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

    protected getQuantityForProduct(Id: number): number {
        return this.card.find(x => x.product.id === Id)?.quantity || 0;
    }

    protected addToCart(product: Product) {
        this.card.push({ product, quantity: 1 });
    }

    protected updateQuantity(product: Product, value: number) {
        const index = this.card.findIndex(x => x.product.id === product.id);
        if (index !== -1) {
            this.card[index].quantity += value;
            if (this.card[index].quantity === 0) {
                this.card.splice(index, 1);
            }
        }
    }
}