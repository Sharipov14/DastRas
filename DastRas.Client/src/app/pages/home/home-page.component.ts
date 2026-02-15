import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, chevronDown, notifications, remove, star, trashOutline } from 'ionicons/icons';
import { ProductsGridComponent } from "../../shared/components/products/products-grid.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
export class HomePageComponent {
    protected currentAddress = 'Select address';
    protected notificationUnreadCount = 0;
    protected selectedCategory: number | null  = null;

//     productService = inject(ProductService);
//     cartService = inject(CartService);
//     addressService = inject(AddressService);
//   notificationService = inject(NotificationService);
    #router = inject(Router);
//   modalCtrl = inject(ModalController);

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

    protected selectCategory(id: number | null) {
        this.selectedCategory = id;
    }

    

    protected goToAddresses() {
        this.#router.navigate(['/addresses']);
    }

    protected async openNotifications() {
        // const modal = await this.modalCtrl.create({
        //   component: NotificationsModalComponent,
        //   breakpoints: [0, 0.85, 1],
        //   initialBreakpoint: 0.85,
        //   cssClass: 'custom-modal',
        //   handle: true
        // });
        // await modal.present();
    }

    protected onIonInfinite(ev: any) {
        setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
        }, 500);
    }
}
