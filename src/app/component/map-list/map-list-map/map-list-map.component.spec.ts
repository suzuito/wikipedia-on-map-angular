import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapListMapComponent } from './map-list-map.component';

describe('MapListMapComponent', () => {
  let component: MapListMapComponent;
  let fixture: ComponentFixture<MapListMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapListMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
