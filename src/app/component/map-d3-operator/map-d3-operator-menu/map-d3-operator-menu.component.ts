import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-d3-operator-menu',
  templateUrl: './map-d3-operator-menu.component.html',
  styleUrls: ['./map-d3-operator-menu.component.scss']
})
export class MapD3OperatorMenuComponent implements OnInit {

  public menus: Array<any>;
  public selectedMenu: string;

  constructor() {
    this.menus = [
      {
        name: 'Display s2 Cells',
        link: 'display-cells',
      },
      {
        name: 'Filter GeoJSON feature',
        link: 'filter-geo-json',
      },
      {
        name: 'Change d3 geo projection',
        link: 'change-geo-projection',
      },
    ];
    this.selectedMenu = 'Display s2 Cells';
  }

  ngOnInit() {
  }

  public selectMenu(menu: string): void {
    this.selectedMenu = menu;
  }

}
