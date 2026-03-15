import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-delivery-modal',
  templateUrl: './delivery-modal.component.html',
  styleUrls: ['./delivery-modal.component.scss'],
  imports: [IonHeader, IonContent],
})
export class DeliveryModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
