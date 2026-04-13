import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent  implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    console.log('profile init');
  }

  ngOnDestroy(): void {
    console.log('profile destroy');
  }

}
