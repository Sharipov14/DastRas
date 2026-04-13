import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonButtons, IonBackButton, IonIcon, IonText, IonGrid, IonRow, IonCol, IonButton } from "@ionic/angular/standalone";
import { ProductService } from '../../core/services/product.service';
import { Category, Product, SubCategory } from '../../core/models/product.model';
import { addIcons } from 'ionicons';
import { arrowBack, cart } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/products/product-card.component';

@Component({
  selector: 'app-category-products-page',
  standalone: true,
  templateUrl: './category-products-page.component.html',
  imports: [IonButton, 
    CommonModule,
    IonCol, IonRow, IonGrid, IonText, IonIcon, IonBackButton, IonButtons, IonToolbar, IonTitle, IonHeader, IonContent,
    ProductCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsPageComponent implements OnInit {
  @ViewChild('scrollContent', { static: false }) content?: IonContent;

  #route = inject(ActivatedRoute);
  #productService = inject(ProductService);
  #router = inject(Router);

  protected categoryId = signal<number | null>(null);
  
  protected category = computed(() => {
    return this.#productService.categories().find(c => c.id === this.categoryId());
  });

  protected subCategories = computed(() => {
    return this.#productService.getSubCategories(this.categoryId());
  });

  protected productsGrouped = computed(() => {
    const products = this.#productService.products().filter(p => p.categoryId === this.categoryId());
    const groups: { subCategory: SubCategory | undefined, products: Product[] }[] = [];

    this.subCategories().forEach(sc => {
      const subProducts = products.filter(p => p.subCategoryId === sc.id);
      if (subProducts.length > 0) {
        groups.push({ subCategory: sc, products: subProducts });
      }
    });

    const uncategorized = products.filter(p => p.subCategoryId === 0);
    if (uncategorized.length > 0) {
      groups.push({ subCategory: undefined, products: uncategorized });
    }

    return groups;
  });

  constructor() {
    addIcons({ arrowBack, cart });
  }

  ngOnInit() {
    const id = this.#route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryId.set(Number(id));
    }
  }

  protected scrollToSubCategory(subId: number) {
    const element = document.getElementById(`sub-${subId}`);
    if (element) {
      const yOffset = -60; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      this.content?.scrollToPoint(0, y, 500);
    }
  }

  protected goBack() {
    this.#router.navigate(['/tabs/categories']);
  }
}
