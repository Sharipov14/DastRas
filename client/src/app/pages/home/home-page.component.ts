import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { InfiniteScrollCustomEvent, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonToolbar, IonContent, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, chevronDown, notifications, remove, star, trashOutline } from 'ionicons/icons';
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
    protected currentAddress = 'Select address';
    protected notificationUnreadCount = 0;

    // Local UI state
    protected categories = this.#productService.categories;
    protected selectedCategoryId = signal<number | null>(null);

    constructor() {
        // Рекомендуется централизовать в будущем, но пока оставляем здесь
        addIcons({ chevronDown, notifications, star, add, remove, trashOutline });
    }

    ngOnInit(): void {
        console.log('home init');
    }

    ngOnDestroy(): void {
        console.log('home destroy');
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

    protected async openNotifications() {
        this.#themeService.toggleTheme(!this.#themeService.isDark());
    }

    protected onIonInfinite(ev: any) {
        setTimeout(() => {
            (ev as InfiniteScrollCustomEvent).target.complete();
        }, 500);
    }
}
