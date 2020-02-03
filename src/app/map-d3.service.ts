import { Injectable } from '@angular/core';
import { ApiClient } from './entity/provider/api-client';
import { GeoStoreService } from './geo-store.service';
import { EventEmitter } from 'events';
import { ModelCell } from './entity/model/s2';

@Injectable({
  providedIn: 'root'
})
export class MapD3Service {

  public center: [number, number];
  private displayGraticulePrivate: boolean;
  public get displayGraticule(): boolean { return this.displayGraticulePrivate; }
  public set displayGraticule(s: boolean) {
    this.displayGraticulePrivate = s;
    this.event.emit('update-setting');
  }
  private displayCellBoundPrivate: boolean;
  public get displayCellBound(): boolean { return this.displayCellBoundPrivate; }
  public set displayCellBound(s: boolean) {
    this.displayCellBoundPrivate = s;
    this.event.emit('update-setting');
  }
  private displayCellCenterPathPrivate: boolean;
  public get displayCellCenterPath(): boolean { return this.displayCellCenterPathPrivate; }
  public set displayCellCenterPath(s: boolean) {
    this.displayCellCenterPathPrivate = s;
    this.event.emit('update-setting');
  }
  private displayLandPrivate: boolean;
  public get displayLand(): boolean { return this.displayLandPrivate; }
  public set displayLand(s: boolean) {
    this.displayLandPrivate = s;
    this.event.emit('update-setting');
  }

  private svgWidth: number;
  private svgHeight: number;
  public stateDrag: any;

  public event: EventEmitter;
  private selectedCellIDs: Set<string>;
  private cursorCellID: string;

  private projectionPlanar: d3.GeoProjection;

  constructor(
    private apiClient: ApiClient,
    private geoStore: GeoStoreService,
  ) {
    this.event = new EventEmitter();
    this.center = [0, 0];
    this.displayGraticulePrivate = false;
    this.displayCellCenterPathPrivate = true;
    this.displayCellBoundPrivate = true;
    this.displayLandPrivate = true;
    this.stateDrag = ({});
    this.selectedCellIDs = new Set<string>();
    this.svgHeight = 500;
    this.svgWidth = 500;
  }

  public setSvgWidth(v: number): void {
    this.svgWidth = v;
  }
  public getSvgWidth(): number {
    return this.svgWidth;
  }
  public setSvgHeight(v: number): void {
    this.svgHeight = v;
  }
  public getSvgHeight(): number {
    return this.svgHeight;
  }

  public setProjectionPlanar(p: d3.GeoProjection): void {
    this.projectionPlanar = p;
  }
  public getProjectionPlanar(): d3.GeoProjection {
    return this.projectionPlanar;
  }

  public async getGeoCells(faces: Array<number>, level: number): Promise<void> {
    const cells = await this.apiClient.getGeoCells(faces, level);
    this.geoStore.setCells(...cells);
  }

  public clearSelectedCells(): void {
    this.selectedCellIDs.clear();
  }
  public getSelectedCells(): Array<ModelCell> {
    const ret = [];
    this.selectedCellIDs.forEach(cellID => {
      const cell = this.geoStore.getCell(cellID);
      if (!cell) { return; }
      ret.push(cell);
    });
    return ret;
  }
  public selectCell(...selectIDs: Array<string>): void {
    selectIDs.forEach(i => this.selectedCellIDs.add(i));
    this.event.emit('update-setting');
  }

  public recursorCell(cellID: string): void {
    this.cursorCellID = cellID;
    this.event.emit('update-setting');
  }

  public get cursorCell(): ModelCell {
    if (!this.cursorCellID) {
      return null;
    }
    return this.geoStore.getCell(this.cursorCellID);
  }

}
