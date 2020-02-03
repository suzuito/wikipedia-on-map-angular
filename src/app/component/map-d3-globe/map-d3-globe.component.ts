import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { WorldService } from 'src/app/geojson/world.service';
import {
  redisplay, redisplayCells, redisplayPoint, clearPoint, redisplayLine, redisplaySelectedCells, redisplayCursorCell,
} from '../../d3-utils';
import { MapD3Service } from 'src/app/map-d3.service';
import { GeoStoreService } from 'src/app/geo-store.service';
declare const versor: any;

@Component({
  selector: 'app-map-d3-globe',
  templateUrl: './map-d3-globe.component.html',
  styleUrls: ['./map-d3-globe.component.scss']
})
export class MapD3GlobeComponent implements OnInit {

  private projection: d3.GeoProjection;
  private initialProjectionScale: number;
  private svg: any;

  constructor(
    private worldService: WorldService,
    private d3Service: MapD3Service,
    private geoStore: GeoStoreService,
  ) {
    this.d3Service.stateDrag = ({});
    this.d3Service.event.addListener('update-setting', () => this.redisplay());
  }

  ngOnInit() {
    this.svg = d3.select('#main')
      .attr('width', this.d3Service.getSvgWidth())
      .attr('height', this.d3Service.getSvgHeight())
      ;
    this.projection = d3.geoOrthographic()
      .rotate([110, -40, 30])
      .fitExtent([
        [5, 5],
        [
          this.d3Service.getSvgWidth() - 5,
          this.d3Service.getSvgHeight() - 5,
        ]
      ], { type: 'Sphere' })
      .precision(0.1)
      ;
    this.initialProjectionScale = this.projection.scale();
    let moving = false;
    const drag = d3.drag()
      .on('start', () => {
        moving = true;
        const c = d3.mouse(this.svg.node());
        const ci = this.projection.invert(c);
        this.d3Service.stateDrag.v0 = versor.cartesian(ci);
        this.d3Service.stateDrag.r0 = this.projection.rotate();
        this.d3Service.stateDrag.q0 = versor(this.d3Service.stateDrag.r0);
      })
      .on('drag', () => {
        const c = d3.mouse(this.svg.node());
        const ci = this.projection.rotate(this.d3Service.stateDrag.r0).invert(c);
        const v1 = versor.cartesian(ci);
        const q1 = versor.multiply(
          this.d3Service.stateDrag.q0,
          versor.delta(this.d3Service.stateDrag.v0, v1),
        );
        this.projection = this.projection.rotate(versor.rotation(q1));
        const centerNewed = this.projection.invert([
          this.d3Service.getSvgWidth() / 2,
          this.d3Service.getSvgHeight() / 2,
        ]);
        this.d3Service.center = centerNewed;
        this.redisplay();
      })
      ;
    const zoom = d3.zoom()
      .on('zoom', () => {
        this.projection.scale(this.initialProjectionScale * d3.event.transform.k);
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
    this.svg
      .call(drag)
      .call(zoom)
      ;
    this.redisplay();
  }

  private redisplay() {
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
    redisplayLine(
      this.svg,
      this.projection,
      this.geoStore.getCells(),
      this.d3Service.displayCellCenterPath,
    );
    redisplaySelectedCells(
      this.svg,
      this.d3Service.getSelectedCells(),
    );
    if (this.d3Service.cursorCell) {
      redisplayCursorCell(this.svg, this.d3Service.cursorCell);
    }
    // clearPoint(this.svg);
    // for (const cell of this.geoStore.getCells()) {
    //   redisplayPoint(this.svg, `cell-center-${cell.id}`, cell.center.latitude, cell.center.longitude, this.projection);
    // }
  }

}
