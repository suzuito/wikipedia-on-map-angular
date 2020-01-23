import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { MatSelectionListChange } from '@angular/material';
import { ModelLocation } from 'src/app/entity/model/s2';

@Component({
  selector: 'app-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss']
})
export class ListCellComponent implements OnInit {

  @Output()
  public selectItem: EventEmitter<MatSelectionListChange>;

  constructor(
    private store: StoreService,
  ) { }

  ngOnInit() {
  }

  public get locations(): Array<ModelLocation> {
    return this.store.locations;
  }

}
