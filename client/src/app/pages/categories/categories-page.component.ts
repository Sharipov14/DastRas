import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonText, IonSearchbar, IonIcon } from "@ionic/angular/standalone";
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { SearchModalComponent } from '../../shared/components/search/search-modal.component';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
  imports: [IonIcon, 
    IonSearchbar,
    IonText, 
    IonCardContent, 
    IonCard, 
    IonCol, 
    IonRow, 
    IonGrid, 
    IonToolbar, 
    IonTitle, 
    IonHeader, 
    IonContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  #productService = inject(ProductService);
  #router = inject(Router);
  #modalController = inject(ModalController);

  protected categories = this.#productService.categories;

  ngOnInit(): void {
    console.log('categories init');
  }


  ngOnDestroy(): void {
    console.log('categories destroy');
  }

  protected async openSearch() {
    const modal = await this.#modalController.create({
      component: SearchModalComponent,
      cssClass: 'search-modal-fullscreen',
      animated: true,
      mode: 'ios',
      backdropDismiss: true,
      handle: false
    });
    
    await modal.present();
  }

  protected selectCategory(id: number) {
    if (id === 0) {
      this.#productService.selectedCategory.set(null);
      this.#productService.searchQuery.set('');
      this.#router.navigate(['/tabs/home']);
    } else {
      this.#productService.selectedCategory.set(id);
      this.#productService.searchQuery.set('');
      this.#router.navigate(['/tabs/category', id]);
    }
  }
}
