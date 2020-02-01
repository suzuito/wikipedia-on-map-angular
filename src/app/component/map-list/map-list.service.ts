import { Injectable } from '@angular/core';
import { ApiClient } from 'src/app/entity/provider/api-client';
import { ModelCell, ModelLocation } from 'src/app/entity/model/s2';

export interface LatLng {
  latitude: number;
  longitude: number;
}

interface PolygonPoint {
  lat: number;
  lng: number;
}

export interface Polygon {
  markers: Array<PolygonPoint>;
}

function newPolygonFromModelCell(c: ModelCell): Polygon {
  return {
    markers: [
      { lat: c.latitude.lo, lng: c.longitude.lo, },
      { lat: c.latitude.lo, lng: c.longitude.hi, },
      { lat: c.latitude.hi, lng: c.longitude.hi, },
      { lat: c.latitude.hi, lng: c.longitude.lo, },
    ],
  };
}

@Injectable({
  providedIn: 'root'
})
export class MapListService {
  public center: LatLng;
  public cursor: LatLng;
  public cells: Array<Polygon>;
  public radius: number;
  public locations: Array<ModelLocation>;
  private selectedLocations: Map<string, boolean>;

  constructor(
    private apiClient: ApiClient,
  ) {
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

  public async getCenterCell(): Promise<void> {
    // const cells = await this.apiClient.getGeoCellsChildren(
    //   this.cursor.lat,
    //   this.cursor.lng,
    // );
    // const cells = await this.apiClient.getGeoCells(
    //   this.cursor.latitude,
    //   this.cursor.longitude,
    //   this.radius,
    // );
    const cap = await this.apiClient.getGeoCaps(
      this.cursor.latitude,
      this.cursor.longitude,
      this.radius,
    );
    // this.cells = cells.map(v => newPolygonFromModelCell(v));
    this.radius = cap.radius;

    this.locations = (await this.apiClient.getGeoLocations(
      this.cursor.latitude,
      this.cursor.longitude,
      this.radius,
    ));
  }
}
