import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3OperatorChangeGeoProjectionComponent } from './map-d3-operator-change-geo-projection.component';

describe('MapD3OperatorChangeGeoProjectionComponent', () => {
  let component: MapD3OperatorChangeGeoProjectionComponent;
  let fixture: ComponentFixture<MapD3OperatorChangeGeoProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapD3OperatorChangeGeoProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapD3OperatorChangeGeoProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
