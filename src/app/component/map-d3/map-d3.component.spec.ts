import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3Component } from './map-d3.component';

describe('MapD3Component', () => {
  let component: MapD3Component;
  let fixture: ComponentFixture<MapD3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapD3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
