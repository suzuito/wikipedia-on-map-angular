import { Component, OnInit } from '@angular/core';
import { MapD3Service } from 'src/app/map-d3.service';
import { GeoStoreService } from 'src/app/geo-store.service';

@Component({
  selector: 'app-display002',
  templateUrl: './display002.component.html',
  styleUrls: ['./display002.component.scss']
})
export class Display002Component implements OnInit {

  public level: number;
  public face: number;

  constructor(
    public d3Service: MapD3Service,
    private geoStore: GeoStoreService,
  ) {
    this.face = 4;
    this.level = 1;
  }

  ngOnInit() {
  }

  public getCells() {
    this.geoStore.clearCells();
    this.d3Service.getGeoCells(this.face, this.level);
  }

}
