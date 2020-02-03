import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-d3-operator-change-geo-projection',
  templateUrl: './map-d3-operator-change-geo-projection.component.html',
  styleUrls: ['./map-d3-operator-change-geo-projection.component.scss']
})
export class MapD3OperatorChangeGeoProjectionComponent implements OnInit {

  public geoProjection: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    const p = this.router.url;
    const pp = p.split('/');
    this.geoProjection = pp[pp.length - 2];
  }

}
