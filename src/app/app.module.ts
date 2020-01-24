import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatListModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { App1Component } from './component/app1/app1.component';
import { MenuComponent } from './component/menu/menu.component';
import { MapListComponent } from './component/map-list/map-list.component';

import { AgmCoreModule } from '@agm/core';
import { MapListMapComponent } from './component/map-list/map-list-map/map-list-map.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiRestfullService } from './provider/api-restfull.service';
import { ApiClient } from './entity/provider/api-client';
import { MapListListGeoLocationComponent } from './component/map-list/map-list-list-geo-location/map-list-list-geo-location.component';
import { MapComponent } from './component/map/map.component';
import { CellComponent } from './component/cell/cell.component';
import { ListCellComponent } from './component/list-cell/list-cell.component';
import { Display001Component } from './component/display001/display001.component';
import { Display002Component } from './component/display002/display002.component';
import { MapD3Component } from './component/map-d3/map-d3.component';

@NgModule({
  declarations: [
    AppComponent,
    App1Component,
    MenuComponent,
    MapListComponent,
    MapListMapComponent,
    MapListListGeoLocationComponent,
    MapComponent,
    CellComponent,
    ListCellComponent,
    Display001Component,
    Display002Component,
    MapD3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapAPIKey,
    }),
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
  ],
  providers: [
    { provide: ApiClient, useClass: ApiRestfullService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
