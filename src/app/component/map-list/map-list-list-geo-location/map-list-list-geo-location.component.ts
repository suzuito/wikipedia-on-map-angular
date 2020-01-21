import { Component, OnInit, Input } from '@angular/core';
import { MapListService } from '../map-list.service';
import { ModelLocation } from 'src/app/entity/model/s2';
import { SelectionChange } from '@angular/cdk/collections';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material';


@Component({
  selector: 'app-map-list-list-geo-location',
  templateUrl: './map-list-list-geo-location.component.html',
  styleUrls: ['./map-list-list-geo-location.component.scss']
})
export class MapListListGeoLocationComponent implements OnInit {

  constructor(
    private mapListService: MapListService,
  ) { }

  ngOnInit() {
  }

  public selectItem(ev: MatSelectionListChange): void {
    this.mapListService.clearSelectedLocation();
    this.mapListService.selectLocation(
      ...ev.source.selectedOptions.selected.map(
        v => v.value.id,
      ),
    );
  }

  public get locations(): Array<ModelLocation> {
    return this.mapListService.locations;
  }

}
