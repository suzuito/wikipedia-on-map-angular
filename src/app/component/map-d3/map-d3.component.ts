import { Component, OnInit } from '@angular/core';
import { data as topoJSON } from '../../topo_110m';
import * as topojson from 'topojson-client';

import * as d3 from 'd3';
import { ModelCell } from 'src/app/entity/model/s2';

declare const versor: any;

@Component({
  selector: 'app-map-d3',
  templateUrl: './map-d3.component.html',
  styleUrls: ['./map-d3.component.scss']
})
export class MapD3Component implements OnInit {

  public selectedProjectionName: string;
  public projections: Map<string, any>;
  // Orthographic projection
  private svgOrthographic: any;
  private svgOrthographicWidth: number;
  private svgOrthographicHeight: number;
  private orthographicGeoProjection: any;
  private stateDrag: any;
  // Mercator projection
  private svg: any;
  private svgWidth: number;
  private svgHeight: number;
  // Equirectangular projection

  private geoJSON: any;

  constructor() {
    const o = topoJSON as any;
    this.geoJSON = topojson.feature(
      o,
      o.objects.countries,
    );
    this.svgOrthographicWidth = 300;
    this.svgOrthographicHeight = 300;
    this.svgWidth = 800;
    this.svgHeight = 600;
    this.stateDrag = ({});
  }

  ngOnInit() {
    this.svgOrthographic = d3.select('svg.orthographic');
    this.orthographicGeoProjection = d3.geoOrthographic();
    this.orthographicGeoProjection
      .rotate([110, -40, 30])
      .fitExtent([
        [5, 5],
        [this.svgOrthographicWidth - 5, this.svgOrthographicHeight - 5]
      ], { type: 'Sphere' })
      .precision(0.1);
    const drag = d3.drag()
      .on('start', () => {
        const c = d3.mouse(this.svgOrthographic.node());
        const ci = this.orthographicGeoProjection.invert(c);
        this.stateDrag.v0 = versor.cartesian(ci);
        this.stateDrag.r0 = this.orthographicGeoProjection.rotate();
        this.stateDrag.q0 = versor(this.stateDrag.r0);
      })
      .on('drag', () => {
        const c = d3.mouse(this.svgOrthographic.node());
        const ci = this.orthographicGeoProjection.rotate(this.stateDrag.r0).invert(c);
        const v1 = versor.cartesian(ci);
        const q1 = versor.multiply(
          this.stateDrag.q0,
          versor.delta(this.stateDrag.v0, v1),
        );
        this.orthographicGeoProjection = this.orthographicGeoProjection.rotate(versor.rotation(q1));
        const centerNewed = this.orthographicGeoProjection.invert([
          this.svgOrthographicWidth / 2,
          this.svgOrthographicHeight / 2,
        ]);
        this.selectedProjection.center(centerNewed);
        this.redisplayOrthographic();
        this.redisplay(this.selectedProjection);
        this.redisplayOrthographicPoint(centerNewed);
        this.redisplayPoint(this.selectedProjection, centerNewed);
        redisplayCells(
          this.svg,
          this.selectedProjection,
          [
            {
              id: 'hoge',
              latitude: {
                lo: 30,
                hi: 33,
              },
              longitude: {
                lo: 130,
                hi: 135,
              },
            },
          ],
        );
      })
      ;
    this.svgOrthographic.call(drag);

    this.svg = d3.select('svg.mercator');

    this.projections = new Map<string, any>();
    this.projections.set('mercator', d3.geoMercator());
    this.projections.set('equirectangular', d3.geoEquirectangular());
    this.projections.set('transverse mercator', d3.geoTransverseMercator());
    this.projections.set('natural earth1', d3.geoNaturalEarth1());
    this.projections.set('equal earth', d3.geoEqualEarth());
    this.projections.set('stereo graphic', d3.geoStereographic());
    this.selectedProjectionName = 'mercator';

    this.redisplayOrthographic();
    this.redisplay(this.selectedProjection);
  }

  private get selectedProjection(): any {
    return this.projections.get(this.selectedProjectionName);
  }

  public projectionNames(): Array<string> {
    return Array.from(this.projections.keys());
  }

  private redisplayOrthographic() {
    redisplay(
      this.svgOrthographic,
      this.orthographicGeoProjection,
      this.svgOrthographicWidth,
      this.svgOrthographicHeight,
      this.geoJSON,
    );
  }

  private redisplayOrthographicPoint(center: Array<number>) {
    redisplayPoint(
      this.svgOrthographic,
      'center',
      center[0],
      center[1],
      this.orthographicGeoProjection,
    );
  }

  private redisplay(projection: any) {
    redisplay(
      this.svg,
      projection,
      this.svgWidth,
      this.svgHeight,
      this.geoJSON,
    );
  }

  private redisplayPoint(
    projection: any,
    center: Array<number>,
  ) {
    redisplayPoint(
      this.svg,
      'center',
      center[0],
      center[1],
      projection,
    );
  }

}

function redisplay(
  svg: any,
  geoProjection: any,
  widthSVG: number,
  heightSVG: number,
  geoJSON: any,
) {
  svg
    .attr('width', widthSVG)
    .attr('height', heightSVG)
    ;
  // Display geo data
  const geoPath = d3.geoPath()
    .projection(geoProjection);
  function updatePath(s) {
    s
      .attr('id', d => `bound-${d.id}`)
      .attr('class', 'bound')
      .attr('stroke', 'gray')
      .attr('stroke-width', '1')
      .attr('d', geoPath)
      .attr('fill', '#66BB6A')
      ;
  }
  const sPath = svg.selectAll('.bound').data(geoJSON.features);
  const sPathEnter = sPath.enter().append('path');
  const sPathExit = sPath.exit();
  updatePath(sPath);
  updatePath(sPathEnter);
  sPathExit.remove();
  // Display geo graticule
  const gg = d3.geoGraticule().lines();
  function updateSgg(s) {
    s
      .attr('class', 'graticule')
      .attr('stroke', '#eee')
      .attr('stroke-width', '1')
      .attr('d', geoPath)
      .attr('fill', 'none')
      ;
  }
  const sGg = svg.selectAll('.graticule').data(gg);
  const sGgEnter = sGg.enter().append('path');
  const sGgExit = sGg.exit();
  updateSgg(sGg);
  updateSgg(sGgEnter);
  sGgExit.remove();
}


function redisplayCells(
  svg: any,
  geoProjection: any,
  cells: Array<ModelCell>,
) {
  // Display geo data
  const geoPath = d3.geoPath()
    .projection(geoProjection);
  function updatePath(s) {
    s
      .attr('id', d => `bound-${d.id}`)
      .attr('class', 'bound')
      .attr('stroke', 'gray')
      .attr('stroke-width', '1')
      .attr('d', geoPath)
      .attr('fill', 'red')
      ;
  }
  const polygons = cells.map(v => newPolygonFromCell(v));
  const geoJSON = {
    type: 'FeatureCollection',
    features: polygons,
  };
  const sPath = svg.selectAll('.cell').data(geoJSON.features);
  const sPathEnter = sPath.enter().append('path');
  const sPathExit = sPath.exit();
  updatePath(sPath);
  updatePath(sPathEnter);
  sPathExit.remove();
  // Display geo graticule
}


function redisplayPoint(
  svg: any,
  id: string,
  lat: number,
  lng: number,
  geoProjection: any,
) {
  const p = geoProjection([lat, lng]);
  svg.select(`#${id}`).remove();
  svg.append('circle')
    .attr('id', id)
    .attr('cx', p[0])
    .attr('cy', p[1])
    .attr('r', 5)
    .attr('stroke', 'black')
    .attr('stroke-width', '1')
    .attr('fill', 'black')
    ;
}

function newPolygonFromCell(cell: ModelCell): any {
  return {
    type: 'Feature',
    properties: [],
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [cell.longitude.lo, cell.latitude.lo],
          [cell.longitude.lo, cell.latitude.hi],
          [cell.longitude.hi, cell.latitude.hi],
          [cell.longitude.hi, cell.latitude.lo],
          [cell.longitude.lo, cell.latitude.lo],
        ],
      ],
    },
  };
}
