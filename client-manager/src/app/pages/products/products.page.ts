import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonSearchbar, IonList, IonItem, IonLabel, 
  IonThumbnail, IonButton, IonIcon, IonFab, IonFabButton,
  IonBadge, IonSelect, IonSelectOption, ModalController,
  IonSegment, IonSegmentButton, IonItemSliding, IonItemOptions,
  IonItemOption, IonButtons as IonButtonsNative
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, filterOutline, listOutline, gridOutline } from 'ionicons/icons';
import { ProductService } from '../../core/services/product.service';
import { Product, Category } from '../../core/models/product.model';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonButtons, 
    IonMenuButton, IonTitle, IonContent, IonSearchbar, IonList, 
    IonItem, IonLabel, IonThumbnail, IonButton, IonIcon, IonFab, 
    IonFabButton, IonBadge, IonSelect, IonSelectOption, IonSegment,
    IonSegmentButton, IonItemSliding, IonItemOptions, IonItemOption
  ]
})
export class ProductsPage {
  private productService = inject(ProductService);
  private modalCtrl = inject(ModalController);
  
  viewMode = signal<'products' | 'categories'>('products');
  searchQuery = signal('');
  selectedCategoryId = signal<number | null>(null);
  
  categories = this.productService.categories;
  products = this.productService.products;
  
  filteredProducts = computed(() => {
    return this.productService.getFilteredProducts(this.selectedCategoryId(), this.searchQuery());
  });

  filteredCategories = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.categories();
    return this.categories().filter(c => c.name.toLowerCase().includes(q));
  });

  constructor() {
    addIcons({ addOutline, createOutline, trashOutline, filterOutline, listOutline, gridOutline });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories().find(c => c.id === categoryId);
    return category ? category.name : 'Нет категории';
  }

  getParentCategoryName(parentId?: number): string | null {
    if (!parentId) return null;
    const parent = this.categories().find(c => c.id === parentId);
    return parent ? parent.name : null;
  }

  onSearch(event: any) {
    this.searchQuery.set(event.detail.value || '');
  }

  // --- Products ---

  async deleteProduct(id: number) {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
      await this.productService.deleteProduct(id);
    }
  }

  async editProduct(product: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductModalComponent,
      componentProps: { product }
    });
    await modal.present();
  }

  async addProduct() {
    const modal = await this.modalCtrl.create({
      component: ProductModalComponent
    });
    await modal.present();
  }

  // --- Categories ---

  async addCategory() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent
    });
    await modal.present();
  }

  async editCategory(category: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: { category }
    });
    await modal.present();
  }

  async deleteCategory(id: number) {
    if (confirm('Удаление категории приведет к отвязке товаров. Продолжить?')) {
      await this.productService.deleteCategory(id);
    }
  }
}
