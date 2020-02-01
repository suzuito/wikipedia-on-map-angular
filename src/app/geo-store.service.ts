import { Injectable } from '@angular/core';
import { ModelCell } from './entity/model/s2';

@Injectable({
  providedIn: 'root'
})
export class GeoStoreService {

  private cells: Map<string, ModelCell>;

  constructor() {
    this.cells = new Map<string, ModelCell>();
  }

  public setCells(...cells: Array<ModelCell>): void {
    for (const cell of cells) {
      this.cells.set(cell.id, cell);
    }
  }

  public getCell(id: string): ModelCell {
    return this.cells.get(id);
  }

  public getCells(): Array<ModelCell> {
    const returned: Array<ModelCell> = [];
    for (const index of this.getIndexiesCell()) {
      returned.push(
        this.getCell(index),
      );
    }
    return returned;
  }

  public getIndexiesCell(): Array<string> {
    let indexies = [];
    for (const key of this.cells.keys()) {
      indexies.push(key);
    }
    indexies = indexies.sort();
    return indexies;
  }

  public clearCells(): void {
    this.cells.clear();
  }

}
