import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3CellsComponent } from './map-d3-cells.component';

describe('MapD3CellsComponent', () => {
  let component: MapD3CellsComponent;
  let fixture: ComponentFixture<MapD3CellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapD3CellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapD3CellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
