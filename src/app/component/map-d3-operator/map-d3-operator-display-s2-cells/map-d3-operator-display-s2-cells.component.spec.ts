import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3OperatorDisplayS2CellsComponent } from './map-d3-operator-display-s2-cells.component';

describe('MapD3OperatorDisplayS2CellsComponent', () => {
  let component: MapD3OperatorDisplayS2CellsComponent;
  let fixture: ComponentFixture<MapD3OperatorDisplayS2CellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapD3OperatorDisplayS2CellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapD3OperatorDisplayS2CellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
