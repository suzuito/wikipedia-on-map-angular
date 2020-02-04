import { Component, OnInit } from '@angular/core';
import { WorldService } from 'src/app/geojson/world.service';
import { GeoStoreService } from 'src/app/geo-store.service';
import { MapD3Service } from 'src/app/map-d3.service';
import * as d3 from 'd3';
import { redisplay, redisplayCells, redisplayLine, redisplaySelectedCells, redisplayCursorCell, redisplayPoint } from 'src/app/d3-utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map-d3-planar',
  templateUrl: './map-d3-planar.component.html',
  styleUrls: ['./map-d3-planar.component.scss']
})
export class MapD3PlanarComponent implements OnInit {

  private svg: any;
  private projection: d3.GeoProjection;
  private initialProjectionScale: number;

  constructor(
    private worldService: WorldService,
    private d3Service: MapD3Service,
    private geoStore: GeoStoreService,
    private route: ActivatedRoute,
  ) {
    this.d3Service.event.addListener('update-setting', () => this.redisplay());
    this.initialProjectionScale = null;
  }

  ngOnInit() {
    this.svg = d3.select('#main')
      .attr('width', this.d3Service.getSvgWidth())
      .attr('height', this.d3Service.getSvgHeight())
      ;
    let moving = false;
    const zoom = d3.zoom()
      .on('zoom', () => {
        this.d3Service.zoomK = d3.zoomTransform(this.svg.node()).k;
        this.redisplay();
      })
      .on('start', () => {
        moving = true;
      })
      .on('end', () => {
        moving = false;
        this.redisplay();
      })
      ;
    let trf: d3.ZoomTransform = null;
    if (!this.d3Service.zoomK) {
      this.d3Service.zoomK = d3.zoomTransform(this.svg.node()).k;
    }
    trf = d3.zoomTransform(this.svg.node()).scale(this.d3Service.zoomK);
    this.route.fragment.subscribe((fragment: string) => {
      this.initializeProjection(fragment);
      this.redisplay();
    });
    this.svg.call(zoom);
    zoom.transform(this.svg, trf);
  }

  public initializeProjection(fragment: string): void {
    switch (fragment) {
      case 'Mercator':
        this.projection = d3.geoMercator();
        break;
      case 'EqualEarth':
        this.projection = d3.geoEqualEarth();
        break;
      default:
        this.projection = d3.geoMercator();
        break;
    }
    this.initialProjectionScale = this.projection.scale();
    this.projection.center(this.d3Service.center);
  }

  public redisplay(): void {
    this.projection.scale(
      // this.initialProjectionScale * d3.zoomTransform(this.svg.node()).k,
      this.initialProjectionScale * this.d3Service.zoomK,
    );
    redisplay(
      this.svg,
      this.projection,
      this.d3Service.getSvgWidth(),
      this.d3Service.getSvgHeight(),
      this.d3Service.displayLand,
      this.d3Service.displayGraticule,
      this.worldService.geoJSON,
    );
    redisplayCells(
      this.svg,
      this.projection,
      this.geoStore.getCells(),
      this.d3Service.displayCellBound,
    );
    // redisplayLine(
    //   this.svg,
    //   this.projection,
    //   this.geoStore.getCells(),
    //   this.d3Service.displayCellCenterPath,
    // );
    // redisplaySelectedCells(
    //   this.svg,
    //   this.d3Service.getSelectedCells(),
    // );
    // if (this.d3Service.cursorCell) {
    //   redisplayCursorCell(this.svg, this.d3Service.cursorCell);
    // }
  }

}
