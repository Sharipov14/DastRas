import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonButtons, IonBackButton, IonFooter } from "@ionic/angular/standalone";
import { ProductService } from '../../core/services/product.service';
import { Product, SubCategory } from '../../core/models/product.model';
import { addIcons } from 'ionicons';
import { arrowBack, cart } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/products/product-card.component';
import { MiniCartComponent } from '../../shared/components/mini-cart/mini-cart.component';

@Component({
  selector: 'app-category-products-page',
  standalone: true,
  templateUrl: './category-products-page.component.html',
  styleUrl: './category-products-page.component.scss',
  imports: [ 
    CommonModule,
    IonFooter, IonBackButton, IonButtons, IonToolbar, IonTitle, IonHeader, IonContent,
    ProductCardComponent,
    MiniCartComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsPageComponent implements OnInit {
  @ViewChild('scrollContent', { static: false }) content?: IonContent;
  @ViewChild('subCategoryBar', { static: false }) subCategoryBar?: ElementRef;

  #route = inject(ActivatedRoute);
  #productService = inject(ProductService);
  #router = inject(Router);

  protected categoryId = signal<number | null>(null);
  protected activeSubCategoryId = signal<number | null>(null);
  
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
      // Set first subcategory as active initially if exists
      const firstSub = this.subCategories()[0];
      if (firstSub) this.activeSubCategoryId.set(firstSub.id);
    }
  }

  protected onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    const groups = this.productsGrouped();
    
    // Find which group is currently in view (with some offset)
    for (let i = groups.length - 1; i >= 0; i--) {
      const group = groups[i];
      const element = document.getElementById(`sub-${group.subCategory?.id}`);
      if (element) {
        // offsetTop is relative to the offsetParent, but we need position relative to ion-content
        if (element.offsetTop <= scrollTop + 100) {
          if (group.subCategory && this.activeSubCategoryId() !== group.subCategory.id) {
            this.activeSubCategoryId.set(group.subCategory.id);
            this.scrollSubCategoryBar(group.subCategory.id);
          }
          break;
        }
      }
    }
  }

  private scrollSubCategoryBar(subId: number) {
    const btn = document.getElementById(`btn-sub-${subId}`);
    if (btn && this.subCategoryBar) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  protected scrollToSubCategory(subId: number) {
    const element = document.getElementById(`sub-${subId}`);
    if (element && this.content) {
      const y = element.offsetTop - 20; // 20px padding
      this.content.scrollToPoint(0, y, 500);
      this.activeSubCategoryId.set(subId);
    }
  }
}
