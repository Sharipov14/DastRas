import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonText, IonSearchbar, IonIcon } from "@ionic/angular/standalone";
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';

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
    IonContent,
    IonHeader
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  #productService = inject(ProductService);
  #router = inject(Router);

  protected categories = this.#productService.categories;

  ngOnInit(): void {
    console.log('categories init');
  }


  ngOnDestroy(): void {
    console.log('categories destroy');
  }

  protected goToSearch() {
    this.#router.navigate(['/search']);
  }

  protected selectCategory(id: number) {
    if (id === 0) {
      this.#router.navigate(['/tabs/home']);
    } else {
      this.#router.navigate(['/category', id]);
    }
  }
}
