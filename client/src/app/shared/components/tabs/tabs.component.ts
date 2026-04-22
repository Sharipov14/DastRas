import { Component, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { grid, home, person, receipt } from 'ionicons/icons';
import { MiniCartComponent } from '../mini-cart/mini-cart.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonLabel, IonTabButton, IonTabBar, IonTabs, IonIcon, MiniCartComponent]
})
export class TabsComponent implements OnInit {

  constructor() { 
    addIcons({home,grid,receipt,person});
  }

  ngOnInit() {}
}
