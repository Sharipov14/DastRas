import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, chevronDown, notifications, remove, star, trashOutline } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  imports: [
    NgClass,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {
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

    protected products: { 
        id: number, 
        rating: number, 
        imageUrl: string, 
        nameRu: string, 
        unit: string,
        price: number,
        categoryId: number,
        quantity: number
    }[] = [];

    constructor() {
        addIcons({ chevronDown, notifications, star, add, remove, trashOutline });
    }

    protected selectCategory(id: number | null) {
        this.selectedCategory = id;
    }

    protected filteredProducts() {
        return this.products.filter(p => p.id === this.selectedCategory || !this.selectedCategory)
            .sort((a, b) => a.id - b.id);
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

    protected goToProduct(id: number) {
        this.#router.navigate(['/product', id]);
    }

    protected addToCart(product: any) {
        console.log('added product',product);
    }

    protected updateQuantity(product: any, value: number) {
        product.quantity += value;
        console.log('updated quantity',product);
    }

    protected onIonInfinite(ev: any) {
        setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
        }, 500);
    }
}
