import { Component, OnInit } from '@angular/core';
import { MapD3Service } from 'src/app/map-d3.service';

@Component({
  selector: 'app-map-d3-operator-display-s2-cells',
  templateUrl: './map-d3-operator-display-s2-cells.component.html',
  styleUrls: ['./map-d3-operator-display-s2-cells.component.scss']
})
export class MapD3OperatorDisplayS2CellsComponent implements OnInit {

  public levels: Array<number>;
  public selectedLevel: number;
  public faces: Array<number>;
  public selectedFaces: any;

  constructor(
    private d3Service: MapD3Service,
  ) {
    this.levels = [];
    this.selectedLevel = 1;
    for (let i = 0; i < 21; i++) {
      this.levels.push(i);
    }
    this.faces = [0, 1, 2, 3, 4, 5];
    this.selectedFaces = {};
    this.faces.forEach(v => this.selectedFaces[v] = false);
    this.selectedFaces[0] = true;
  }

  ngOnInit() {
  }

  public getCells() {
    this.d3Service.getGeoCells(
      this.faces.filter(v => this.selectedFaces[v]),
      this.selectedLevel,
    );
  }

}
