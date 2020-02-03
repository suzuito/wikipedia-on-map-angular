import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3PlanarComponent } from './map-d3-planar.component';

describe('MapD3PlanarComponent', () => {
  let component: MapD3PlanarComponent;
  let fixture: ComponentFixture<MapD3PlanarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapD3PlanarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapD3PlanarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
