import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { App1Component } from './component/app1/app1.component';
import { MapListComponent } from './component/map-list/map-list.component';
import { CellComponent } from './component/cell/cell.component';
import { Display001Component } from './component/display001/display001.component';
import { Display002Component } from './component/display002/display002.component';
import { MapD3GlobeComponent } from './component/map-d3-globe/map-d3-globe.component';
import {
  MapD3OperatorDisplayS2CellsComponent,
} from './component/map-d3-operator/map-d3-operator-display-s2-cells/map-d3-operator-display-s2-cells.component';
import { MapD3CellsComponent } from './component/map-d3-cells/map-d3-cells.component';
import {
  MapD3OperatorFilterGeoJsonComponent,
} from './component/map-d3-operator/map-d3-operator-filter-geo-json/map-d3-operator-filter-geo-json.component';
import {
  MapD3OperatorChangeGeoProjectionComponent,
} from './component/map-d3-operator/map-d3-operator-change-geo-projection/map-d3-operator-change-geo-projection.component';
import { MapD3PlanarComponent } from './component/map-d3-planar/map-d3-planar.component';


const routesD3Operator: Routes = [
  {
    path: 'display-cells',
    component: MapD3OperatorDisplayS2CellsComponent,
  },
  {
    path: 'filter-geo-json',
    component: MapD3OperatorFilterGeoJsonComponent,
  },
  {
    path: 'change-geo-projection',
    component: MapD3OperatorChangeGeoProjectionComponent,
  },
];

const routes: Routes = [
  {
    path: '', component: App1Component,
    children: [
      {
        path: 'agm',
        component: Display001Component,
        children: [],
      },
      {
        path: 'd3',
        component: Display002Component,
        children: [
          {
            path: 'cells',
            component: MapD3CellsComponent,
            children: [
              {
                path: 'globe',
                component: MapD3GlobeComponent,
                children: routesD3Operator,
              },
              {
                path: 'planar',
                component: MapD3PlanarComponent,
                children: routesD3Operator,
              },
            ],
          }
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
