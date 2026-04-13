import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonList, IonItem, IonButtons, IonBackButton, IonIcon, IonButton, ModalController } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-delivery-modal',
  standalone: true,
  templateUrl: './delivery-modal.component.html',
  styleUrls: ['./delivery-modal.component.scss'],
  imports: [IonButton, IonIcon, IonButtons, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonContent],
})
export class DeliveryModalComponent  implements OnInit, OnDestroy {

  #modalController = inject(ModalController);
  
  constructor() {
    addIcons({close});
   }

  ngOnInit() {
    console.log('delivery modal init');
  }

  ngOnDestroy(): void {
    console.log('delivery modal destroy');
  }

  protected async closeModal(): Promise<boolean> {
    return await this.#modalController.dismiss();
  }
}