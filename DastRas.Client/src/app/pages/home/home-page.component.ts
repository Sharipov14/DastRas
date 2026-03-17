import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonToolbar } from '@ionic/angular/standalone';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, chevronDown, notifications, remove, star, trashOutline } from 'ionicons/icons';
import { ProductsGridComponent } from "../../shared/components/products/products-grid.component";
import { ThemeService } from '../../shared/services/theme.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonToolbar, 
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
})
export class HomePageComponent implements OnInit, OnDestroy {
    protected currentAddress = 'Select address';
    protected notificationUnreadCount = 0;
    protected selectedCategory: number | null  = null;

    #router = inject(Router);
    #themeService = inject(ThemeService);

    protected categories: { id: number, name: string }[] = [
        { id: 1, name: 'Все' },
        { id: 2, name: 'Овощи' },
        { id: 3, name: 'Фрукты' },
        { id: 4, name: 'Мясо' },
        { id: 5, name: 'Рыба' },
        { id: 6, name: 'Сыр' },
        { id: 7, name: 'Молочные продукты' },
        { id: 8, name: 'Хлеб' }
    ];

    constructor() {
        addIcons({ chevronDown, notifications, star, add, remove, trashOutline });
    }

    ngOnInit(): void {
        console.log('home init');
    }

    ngOnDestroy(): void {
        console.log('home destroy');
    }

    protected selectCategory(id: number | null) {
        this.selectedCategory = id;
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
