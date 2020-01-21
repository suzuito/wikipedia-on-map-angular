import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapListListGeoLocationComponent } from './map-list-list-geo-location.component';

describe('MapListListGeoLocationComponent', () => {
  let component: MapListListGeoLocationComponent;
  let fixture: ComponentFixture<MapListListGeoLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapListListGeoLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapListListGeoLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
