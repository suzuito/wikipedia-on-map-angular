import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreService, LatLng, Polygon } from 'src/app/store.service';
import { ModelLocation } from 'src/app/entity/model/s2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output()
  public clickMap: EventEmitter<any>;

  constructor(
    private store: StoreService,
  ) {
    this.clickMap = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  public get center(): LatLng {
    return this.store.center;
  }

  public get cells(): Array<Polygon> {
    return this.store.cells;
  }

  public get cursor(): LatLng {
    return this.store.cursor;
  }

  public get radius(): number {
    return this.store.radius * 1000;
  }

  public get locations(): Array<ModelLocation> {
    return this.store.locations;
  }

  // public clickMap(ev: any) {
  //   this.store.cursor.latitude = ev.coords.lat;
  //   this.store.cursor.longitude = ev.coords.lng;
  //   this.store.getCenterCell();
  // }

}
