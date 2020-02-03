import { Component, OnInit } from '@angular/core';
import { MapD3Service } from 'src/app/map-d3.service';

@Component({
  selector: 'app-map-d3-operator-filter-geo-json',
  templateUrl: './map-d3-operator-filter-geo-json.component.html',
  styleUrls: ['./map-d3-operator-filter-geo-json.component.scss']
})
export class MapD3OperatorFilterGeoJsonComponent implements OnInit {

  constructor(
    public d3Service: MapD3Service,
  ) { }

  ngOnInit() {
  }

}
