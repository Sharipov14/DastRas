import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { MiniCartComponent } from '../mini-cart/mini-cart.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonLabel, IonTabButton, IonTabBar, IonTabs, IonIcon, MiniCartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit {

  ngOnInit() {}
}
