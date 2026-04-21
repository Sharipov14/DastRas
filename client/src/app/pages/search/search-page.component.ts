import { ChangeDetectionStrategy, Component, inject, signal, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonContent, 
  IonToolbar, 
  IonSearchbar, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonChip, 
  IonLabel, 
  IonText, 
  IonTitle,
  IonBackButton,
  IonFooter
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowBack, closeCircle, search } from 'ionicons/icons';
import { ProductService } from '../../core/services/product.service';
import { ProductsGridComponent } from '../../shared/components/products/products-grid.component';
import { Router } from '@angular/router';
import { MiniCartComponent } from '../../shared/components/mini-cart/mini-cart.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  imports: [
    CommonModule,
    IonTitle,
    IonToolbar,
    IonText,
    IonLabel,
    IonChip,
    IonIcon,
    IonButton,
    IonButtons,
    IonSearchbar,
    IonHeader,
    IonContent,
    IonBackButton,
    IonFooter,
    ProductsGridComponent,
    MiniCartComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  @ViewChild('searchbar', { static: false }) searchbar?: IonSearchbar;

  #productService = inject(ProductService);
  #router = inject(Router);

  protected searchQuery = signal<string>('');
  protected recommendations = ['Помидоры', 'Молоко', 'Свежий хлеб', 'Мясо', 'Фрукты'];

  constructor() {
    addIcons({ arrowBack, closeCircle, search });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Автофокус
    setTimeout(() => {
      this.searchbar?.setFocus();
    }, 400);
  }

  protected onSearch(event: any) {
    const query = event.detail.value || '';
    this.searchQuery.set(query);
  }

  protected selectRecommendation(text: string) {
    this.searchQuery.set(text);
  }

  protected cancelSearch() {
    this.searchQuery.set('');
    this.#router.navigate(['/tabs/home']);
  }
}
