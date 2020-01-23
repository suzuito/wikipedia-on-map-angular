import { Injectable } from '@angular/core';
import {
  ModelCell,
  ModelLocation,
} from './entity/model/s2';


export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Point extends LatLng {
  data: any;
}

interface PolygonPoint {
  lat: number;
  lng: number;
}

export interface Polygon {
  markers: Array<PolygonPoint>;
  data: any;
}

function newPolygonFromModelCell(c: ModelCell): Polygon {
  return {
    markers: [
      { lat: c.latitude.lo, lng: c.longitude.lo, },
      { lat: c.latitude.lo, lng: c.longitude.hi, },
      { lat: c.latitude.hi, lng: c.longitude.hi, },
      { lat: c.latitude.hi, lng: c.longitude.lo, },
    ],
    data: c,
  };
}


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public center: LatLng;
  public cursor: LatLng;
  public cells: Array<Polygon>;
  public radius: number;
  public locations: Array<ModelLocation>;
  private selectedLocations: Map<string, boolean>;
  constructor() {
    this.radius = 1;
    this.cursor = { latitude: 0, longitude: 0 };
    this.center = { latitude: 35.6804, longitude: 139.7690 };
    this.cells = [];
    this.locations = [];
    this.selectedLocations = new Map<string, boolean>();
  }

  public isSelectedLocation(id: string): boolean {
    return this.selectedLocations.has(id);
  }
  public clearSelectedLocation(): void {
    this.selectedLocations.clear();
  }
  public unselectLocation(...ids: Array<string>): void {
    ids.forEach(id => this.selectedLocations.delete(id));
  }
  public selectLocation(...ids: Array<string>): void {
    ids.forEach(id => this.selectedLocations.set(id, true));
  }
}
