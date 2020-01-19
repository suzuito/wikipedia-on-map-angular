import { ModelCell, ModelCap, ModelLocation } from '../model/s2';

export abstract class ApiClient {

  constructor() { }

  public abstract getGeoLocations(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<Array<ModelLocation>>;

  // For debug
  public abstract getGeoCaps(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<ModelCap>;
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
