import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { App1Component } from './component/app1/app1.component';
import { MapListComponent } from './component/map-list/map-list.component';


const routes: Routes = [
  {
    path: '', component: App1Component,
    children: [
      {
        path: 'list',
        component: MapListComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
