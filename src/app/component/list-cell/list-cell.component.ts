import { Component, OnInit, Output } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { MatSelectionListChange } from '@angular/material';
import { ModelLocation, ModelCell } from 'src/app/entity/model/s2';
import { GeoStoreService } from 'src/app/geo-store.service';
import { MapD3Service } from 'src/app/map-d3.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss']
})
export class ListCellComponent implements OnInit {

  constructor(
    private d3Service: MapD3Service,
    private store: GeoStoreService,
  ) { }

  ngOnInit() {
  }

  public get cells(): Array<ModelCell> {
    return this.store.getCells();
  }

  public changeSelected(event: MatSelectionListChange): void {
    const cellIDs: Array<string> = event.source.selectedOptions.selected.map(v => v.value);
    this.d3Service.clearSelectedCells();
    this.d3Service.selectCell(...cellIDs);
  }

  public cursorCell(cellID: string): void {
    this.d3Service.recursorCell(cellID);
    console.log(this.d3Service.cursorCell);
  }

  public cursorOut(): void {
    this.d3Service.recursorCell(null);
  }

}
