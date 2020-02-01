import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3GlobeComponent } from './map-d3-globe.component';

describe('MapD3GlobeComponent', () => {
  let component: MapD3GlobeComponent;
  let fixture: ComponentFixture<MapD3GlobeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapD3GlobeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapD3GlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
