import { ModelCell } from '../model/s2';

export abstract class ApiClient {

  constructor() { }

  // For debug
  public abstract getGeoCells(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<Array<ModelCell>>;
  public abstract getGeoCellsChildren(
    lat: number,
    lng: number,
  ): Promise<Array<ModelCell>>;
}
