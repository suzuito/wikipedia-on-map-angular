import { Component, OnInit } from '@angular/core';
import {
  Polygon,
  MapListService,
  LatLng,
} from '../map-list.service';
import { ModelLocation } from 'src/app/entity/model/s2';

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

  public get center(): LatLng {
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

  public get locations(): Array<ModelLocation> {
    return this.mapListService.locations;
  }

  public clickMap(ev: any) {
    this.mapListService.cursor.latitude = ev.coords.lat;
    this.mapListService.cursor.longitude = ev.coords.lng;
    this.mapListService.getCenterCell();
  }


}
