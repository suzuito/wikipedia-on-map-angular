import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material';
import { StoreService } from 'src/app/store.service';
import { ModelLocation } from 'src/app/entity/model/s2';

@Component({
  selector: 'app-list-loc',
  templateUrl: './list-loc.component.html',
  styleUrls: ['./list-loc.component.scss']
})
export class ListLocComponent implements OnInit {

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
