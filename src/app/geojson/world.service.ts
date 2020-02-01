import { Injectable } from '@angular/core';
import { data as topoJSON } from '../topo_110m';
import * as topojson from 'topojson-client';

@Injectable({
  providedIn: 'root'
})
export class WorldService {

  public geoJSON: GeoJSON.FeatureCollection;

  constructor() {
    const o = topoJSON as any;
    this.geoJSON = topojson.feature(
      o,
      o.objects.countries,
    ) as any;
  }
}
