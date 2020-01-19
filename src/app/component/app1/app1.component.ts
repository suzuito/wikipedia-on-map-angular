import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app1',
  templateUrl: './app1.component.html',
  styleUrls: ['./app1.component.scss']
})
export class App1Component implements OnInit {

  public openedSidenav: boolean;
  constructor() {
    this.openedSidenav = false;
  }

  ngOnInit() {
  }

  public clickMenu(): void {
    this.openedSidenav = true;
  }

}
