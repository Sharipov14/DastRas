import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { 
  InfiniteScrollCustomEvent, 
  IonIcon, 
  IonInfiniteScroll, 
  IonInfiniteScrollContent, 
  IonToolbar, 
  IonContent, 
  IonHeader,
  IonButtons,
  IonButton,
  IonBadge
} from '@ionic/angular/standalone';
import { ProductsGridComponent } from "../../shared/components/products/products-grid.component";
import { ThemeService } from '../../shared/services/theme.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonToolbar, 
    NgClass,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonButtons,
    IonButton,
    IonBadge,
    ProductsGridComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {
    #router = inject(Router);
    #themeService = inject(ThemeService);
    #productService = inject(ProductService);

    // Template state
    protected currentAddress = signal('Выбрать адрес');
    protected notificationUnreadCount = signal(2); // Mock value

    // Local UI state
    protected categories = this.#productService.categories;
    protected selectedCategoryId = signal<number | null>(null);

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    protected selectCategory(id: number | null) {
        if (id === null) {
            this.selectedCategoryId.set(null);
        } else {
            this.#router.navigate(['/category', id]);
        }
    }


    protected goToAddresses() {
        this.#router.navigate(['/addresses']);
    }

    protected goToSearch() {
        this.#router.navigate(['/search']);
    }

    protected async openNotifications() {
        this.#router.navigate(['/notifications']);
    }

    protected onIonInfinite(ev: any) {
        setTimeout(() => {
            (ev as InfiniteScrollCustomEvent).target.complete();
        }, 500);
    }
}
