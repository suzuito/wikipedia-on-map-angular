import { Injectable } from '@angular/core';
import { ApiClient } from 'src/app/entity/provider/api-client';
import { ModelCell } from 'src/app/entity/model/s2';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Marker extends LatLng {
  data: any;
}


export interface Polygon {
  markers: Array<LatLng>;
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
  public center: Marker;
  public cursor: LatLng;
  public cells: Array<Polygon>;
  public radius: number;
  public locations: Array<Marker>;

  constructor(
    private apiClient: ApiClient,
  ) {
    this.radius = 1;
    this.cursor = { lat: 0, lng: 0 };
    this.center = { lat: 35.6804, lng: 139.7690, data: null };
    this.cells = [];
    this.locations = [];
  }

  public async getCenterCell(): Promise<void> {
    // const cells = await this.apiClient.getGeoCellsChildren(
    //   this.cursor.lat,
    //   this.cursor.lng,
    // );
    const cells = await this.apiClient.getGeoCells(
      this.cursor.lat,
      this.cursor.lng,
      this.radius,
    );
    const cap = await this.apiClient.getGeoCaps(
      this.cursor.lat,
      this.cursor.lng,
      this.radius,
    );
    this.cells = cells.map(v => newPolygonFromModelCell(v));
    this.radius = cap.radius;

    this.locations = (await this.apiClient.getGeoLocations(
      this.cursor.lat,
      this.cursor.lng,
      this.radius,
    )).map((v: any) => {
      return {
        lat: v.Latitude,
        lng: v.Longitude,
        data: null,
      };
    });
    console.log(this.locations);
  }
}
