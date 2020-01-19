import { Component, OnInit } from '@angular/core';
import {
  Marker,
  Polygon,
  MapListService,
  LatLng,
} from '../map-list.service';

@Component({
  selector: 'app-map-list-map',
  templateUrl: './map-list-map.component.html',
  styleUrls: ['./map-list-map.component.scss']
})
export class MapListMapComponent implements OnInit {
  constructor(
    private mapListService: MapListService,
  ) {
  }

  ngOnInit() {
  }

  public get center(): Marker {
    return this.mapListService.center;
  }

  public get cells(): Array<Polygon> {
    return this.mapListService.cells;
  }

  public get cursor(): LatLng {
    return this.mapListService.cursor;
  }

  public get radius(): number {
    return this.mapListService.radius * 1000;
  }

  public clickMap(ev: any) {
    this.mapListService.cursor.lat = ev.coords.lat;
    this.mapListService.cursor.lng = ev.coords.lng;
    this.mapListService.getCenterCell();
  }

}
