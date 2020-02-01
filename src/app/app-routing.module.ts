import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { App1Component } from './component/app1/app1.component';
import { MapListComponent } from './component/map-list/map-list.component';
import { CellComponent } from './component/cell/cell.component';
import { Display001Component } from './component/display001/display001.component';
import { Display002Component } from './component/display002/display002.component';
import { MapD3GlobeComponent } from './component/map-d3-globe/map-d3-globe.component';


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
            path: 'globe',
            component: MapD3GlobeComponent,
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
