import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3OperatorFilterGeoJsonComponent } from './map-d3-operator-filter-geo-json.component';

describe('MapD3OperatorFilterGeoJsonComponent', () => {
  let component: MapD3OperatorFilterGeoJsonComponent;
  let fixture: ComponentFixture<MapD3OperatorFilterGeoJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapD3OperatorFilterGeoJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapD3OperatorFilterGeoJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
