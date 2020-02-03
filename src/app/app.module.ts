import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatListModule, MatButtonToggleModule, MatInputModule, MatCheckboxModule, MatCardModule, MatSelectModule,
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
import { MapD3GlobeComponent } from './component/map-d3-globe/map-d3-globe.component';
import { FormsModule } from '@angular/forms';
import { ListLocComponent } from './component/list-loc/list-loc.component';
import { MapD3OperatorComponent } from './component/map-d3-operator/map-d3-operator.component';
import { MapD3OperatorDisplayS2CellsComponent } from './component/map-d3-operator/map-d3-operator-display-s2-cells/map-d3-operator-display-s2-cells.component';
import { MapD3CellsComponent } from './component/map-d3-cells/map-d3-cells.component';
import { MapD3OperatorFilterGeoJsonComponent } from './component/map-d3-operator/map-d3-operator-filter-geo-json/map-d3-operator-filter-geo-json.component';
import { MapD3OperatorChangeGeoProjectionComponent } from './component/map-d3-operator/map-d3-operator-change-geo-projection/map-d3-operator-change-geo-projection.component';
import { MapD3PlanarComponent } from './component/map-d3-planar/map-d3-planar.component';
import { MapD3OperatorMenuComponent } from './component/map-d3-operator/map-d3-operator-menu/map-d3-operator-menu.component';

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
    MapD3GlobeComponent,
    ListLocComponent,
    MapD3OperatorComponent,
    MapD3OperatorDisplayS2CellsComponent,
    MapD3CellsComponent,
    MapD3OperatorFilterGeoJsonComponent,
    MapD3OperatorChangeGeoProjectionComponent,
    MapD3PlanarComponent,
    MapD3OperatorMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapAPIKey,
    }),
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
  ],
  providers: [
    { provide: ApiClient, useClass: ApiRestfullService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
