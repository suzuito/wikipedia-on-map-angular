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

  constructor(
    private worldService: WorldService,
    private d3Service: MapD3Service,
    private geoStore: GeoStoreService,
    private route: ActivatedRoute,
  ) {
    this.d3Service.event.addListener('update-setting', () => this.redisplay());
  }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      this.initializeProjection(fragment);
      this.redisplay();
    });
    // this.initialProjectionScale = this.projection.scale();
    // let dragStart: [number, number] = [0, 0];
    this.svg.on('click', () => {
      // this.projection.center(this.projection.invert(d3.mouse(this.svg.node())));
      // this.redisplay();
    });
    const drag = d3.drag()
      .on('start', (v) => {
        // dragStart = d3.mouse(this.svg.node());
      })
      .on('drag', () => {
        // console.log(this.projection.invert(d3.mouse(this.svg.node())));
        // this.projection.center(this.projection.invert(d3.mouse(this.svg.node())));
        // this.redisplay();
        // const dragEnd: [number, number] = d3.mouse(this.svg.node());
        // const dragStartLL = this.projection.invert(dragStart);
        // const dragEndLL = this.projection.invert(dragEnd);
        // const d1 = d3.geoDistance(
        //   [dragStartLL[0], 0],
        //   [dragEndLL[0], 0],
        // );
        // let d1Dir = 1;
        // if (dragStartLL[0] > dragEndLL[0]) { d1Dir = -1; }
        // let d2Dir = 1;
        // if (dragStartLL[1] > dragEndLL[1]) { d2Dir = -1; }
        // const d2 = d3.geoDistance(
        //   [0, dragStartLL[1]],
        //   [0, dragEndLL[1]],
        // );
        // let [x] = this.projection.rotate();
        // // this.projection.rotate([x + d1 * d1Dir, 0, 0]);
        // let [xx, yy] = this.projection.rotate();
        // // this.projection.rotate([xx, yy + d2 * d2Dir, 0]);
        // // this.projection.center(dragEndLL);
        // console.log(dragEndLL);
        // this.redisplay();
      });
    let moving = false;
    const zoom = d3.zoom()
      .on('zoom', () => {
        console.log(d3.event.transform.k);
        this.d3Service.zoomTransformK = d3.event.transform.k;
        // this.projection.scale(this.d3Service.initialPlanarProjectionScale * d3.event.transform.k);
        // this.d3Service.initialPlanarProjectionScale = this.projection.scale();
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
    // this.redisplay();
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
    this.svg = d3.select('#main')
      .attr('width', this.d3Service.getSvgWidth())
      .attr('height', this.d3Service.getSvgHeight())
      ;
    if (!this.d3Service.zoomTransformK) {
      this.d3Service.zoomTransformK = 1;
      this.d3Service.initialPlanarProjectionScale = this.projection.scale();
    }
    this.projection.center(this.d3Service.center);
  }

  public redisplay(): void {
    this.projection.scale(this.d3Service.initialPlanarProjectionScale * this.d3Service.zoomTransformK);
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
