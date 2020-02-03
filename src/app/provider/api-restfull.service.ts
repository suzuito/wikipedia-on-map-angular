import { Injectable } from '@angular/core';
import { API } from 'src/environments/common';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { ApiClient } from '../entity/provider/api-client';
import { ModelCell, ModelCap, ModelLocation } from '../entity/model/s2';
import { environment } from 'src/environments/environment';

function u(api: API, path: string): string {
  return `${api.origin}${path}`;
}

class OptBuilder {
  private o: any;
  constructor() {
    this.o = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
      withCredentials: false, // Must be false for Google Cloud Storage
    };
  }
  public header(k: string, v: string): OptBuilder {
    this.o.headers = this.o.headers.set(k, v);
    return this;
  }
  public param(k: string, v: string): OptBuilder {
    this.o.params = this.o.params.set(k, v);
    return this;
  }
  public jsonResponseBody(): OptBuilder {
    this.o.responseType = 'json';
    return this;
  }
  public textResponseBody(): OptBuilder {
    this.o.responseType = 'text';
    return this;
  }
  public fullResponse(): OptBuilder {
    this.o.observe = 'response';
    return this;
  }
  public gen(): any {
    return this.o;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiRestfullService extends ApiClient {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  // public async getGeoCells(
  //   lat: number,
  //   lng: number,
  //   radius: number,
  // ): Promise<Array<ModelCell>> {
  //   return this.http.get(
  //     u(environment.api, '/geo/cells/convex'),
  //     new OptBuilder()
  //       .param('lat', lat.toString())
  //       .param('lng', lng.toString())
  //       .param('radius', radius.toString())
  //       .jsonResponseBody()
  //       .gen(),
  //   ).toPromise().then(v => {
  //     return v as any;
  //   });
  // }

  public async getGeoCellsChildren(
    lat: number,
    lng: number,
  ): Promise<Array<ModelCell>> {
    return this.http.get(
      u(environment.api, '/geo/cells/children'),
      new OptBuilder()
        .param('lat', lat.toString())
        .param('lng', lng.toString())
        .jsonResponseBody()
        .gen(),
    ).toPromise().then(v => {
      return v as any;
    });
  }

  public async getGeoCaps(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<ModelCap> {
    return this.http.get(
      u(environment.api, '/geo/caps'),
      new OptBuilder()
        .param('lat', lat.toString())
        .param('lng', lng.toString())
        .param('radius', radius.toString())
        .jsonResponseBody()
        .gen(),
    ).toPromise().then(v => {
      return v as any;
    });
  }

  public async getGeoLocations(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<Array<ModelLocation>> {
    return this.http.get(
      u(environment.api, '/geo/locations'),
      new OptBuilder()
        .param('lat', lat.toString())
        .param('lng', lng.toString())
        .param('radius', radius.toString())
        .jsonResponseBody()
        .gen(),
    ).toPromise().then(v => {
      return v as any;
    });
  }

  public async getGeoCells(faces: Array<number>, level: number): Promise<Array<ModelCell>> {
    return this.http.get(
      u(environment.api, '/geo/cells'),
      new OptBuilder()
        .param('level', level.toString())
        .param('faces', faces.join(','))
        .jsonResponseBody()
        .gen(),
    ).toPromise().then(v => {
      return v as any;
    });
  }
}
