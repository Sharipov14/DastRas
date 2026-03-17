import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButton, IonModal, IonItem, IonList } from "@ionic/angular/standalone";

@Component({
  selector: 'app-categories-page',
  standalone: true,
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
  imports: [IonList, IonItem, IonModal, IonButton, IonToolbar, IonTitle, IonHeader, IonContent],
})
export class CategoriesPageComponent  implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    console.log('categories init');
  }

  ngOnDestroy(): void {
    console.log('categories destroy');
  }

}
