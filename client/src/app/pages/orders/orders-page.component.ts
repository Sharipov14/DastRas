import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent  implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    console.log('order init');
  }

  ngOnDestroy(): void {
    console.log('order destroy');
  }

}
