import { Component, OnInit } from '@angular/core';
import { data as topoJSON } from '../../topo_110m';
import * as topojson from 'topojson-client';

import * as d3 from 'd3';

declare const versor: any;

@Component({
  selector: 'app-map-d3',
  templateUrl: './map-d3.component.html',
  styleUrls: ['./map-d3.component.scss']
})
export class MapD3Component implements OnInit {

  private svgOrthographic: any;
  private svgOrthographicWidth: number;
  private svgOrthographicHeight: number;
  private orthographicGeoProjection: any;
  private stateDrag: any;

  private mercatorGeoProjection: any;
  private svgMercator: any;
  private svgMercatorWidth: number;
  private svgMercatorHeight: number;

  private geoJSON: any;

  constructor() {
    this.geoJSON = topojson.feature(topoJSON, topoJSON.objects.countries);
    this.svgOrthographicWidth = 300;
    this.svgOrthographicHeight = 300;
    this.svgMercatorWidth = 600;
    this.svgMercatorHeight = 600;
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
        ], {type: "Sphere"})
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
            this.mercatorGeoProjection.center(centerNewed);
            this.redisplayOrthographic();
            this.redisplayMercator();
        })
    ;
    this.svgOrthographic.call(drag);

    this.svgMercator = d3.select('svg.mercator');
    this.mercatorGeoProjection = d3.geoMercator()

    this.redisplayOrthographic();
    this.redisplayMercator();
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

  private redisplayMercator() {
    redisplay(
      this.svgMercator,
      this.mercatorGeoProjection,
      this.svgMercatorWidth,
      this.svgMercatorHeight,
      this.geoJSON,
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
      .attr('id', (d) => { return `bound-${d.id}`; })
      .attr('class', 'bound')
      .attr("stroke", 'gray')
      .attr("stroke-width", "1")
      .attr("d", geoPath)
      .attr('fill', '#66BB6A')
      ;
  }
  const sPath = svg.selectAll(".bound").data(geoJSON.features);
  const sPathEnter = sPath.enter().append('path');
  const sPathExit = sPath.exit();
  updatePath(sPath);
  updatePath(sPathEnter);
  sPathExit.remove();
  // Display geo graticule
  // const gg = d3.geoGraticule().lines();
  // function updateSgg(s) {
  //   s
  //     .attr('class', 'graticule')
  //     .attr("stroke", "#eee")
  //     .attr("stroke-width", "1")
  //     .attr("d", geoPath)
  //     .attr('fill', 'none')
  //     ;
  // }
  // const sGg = svg.selectAll(".graticule").data(gg);
  // const sGgEnter = sGg.enter().append('path');
  // const sGgExit = sGg.exit();
  // updateSgg(sGg);
  // updateSgg(sGgEnter);
  // sGgExit.remove();
}