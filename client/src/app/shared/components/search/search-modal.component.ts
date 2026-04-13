import { ChangeDetectionStrategy, Component, inject, signal, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonHeader, IonContent, IonToolbar, IonSearchbar, IonButtons, IonButton, IonIcon, IonChip, IonLabel, IonText, IonTitle } from "@ionic/angular/standalone";
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, closeCircle } from 'ionicons/icons';
import { ProductService } from '../../../core/services/product.service';
import { ProductsGridComponent } from '../products/products-grid.component';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  templateUrl: './search-modal.component.html',
  imports: [
    IonTitle,
    IonText,
    IonLabel,
    IonChip,
    IonIcon,
    IonButton,
    IonButtons,
    IonSearchbar,
    IonToolbar,
    IonHeader,
    IonContent,
    ProductsGridComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchModalComponent implements OnInit, AfterViewInit {
  @ViewChild('searchbar', { static: false }) searchbar?: IonSearchbar;

  #modalController = inject(ModalController);
  #productService = inject(ProductService);

  protected searchQuery = this.#productService.searchQuery;
  protected recommendations = ['Помидоры', 'Молоко', 'Свежий хлеб', 'Мясо', 'Фрукты'];

  constructor() {
    addIcons({ arrowBack, closeCircle });
  }

  ngOnInit() {
    // Начальный сброс поиска при открытии
    this.#productService.searchQuery.set('');
  }

  ngAfterViewInit() {
    // Автофокус при открытии (с небольшой задержкой для плавности анимации)
    setTimeout(() => {
      this.searchbar?.setFocus();
    }, 400);
  }

  protected onSearch(event: any) {
    const query = event.detail.value || '';
    this.#productService.searchQuery.set(query);
  }

  protected selectRecommendation(text: string) {
    this.#productService.searchQuery.set(text);
  }

  protected dismiss() {
    this.#productService.searchQuery.set('');
    this.#modalController.dismiss();
  }
}
