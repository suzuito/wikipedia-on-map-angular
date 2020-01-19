import { Component, OnInit } from '@angular/core';
import { ApiClient } from 'src/app/entity/provider/api-client';
import { MapListService } from './map-list.service';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.scss']
})
export class MapListComponent implements OnInit {

  constructor(
    private mapListService: MapListService,
  ) { }

  ngOnInit() {
  }

}
