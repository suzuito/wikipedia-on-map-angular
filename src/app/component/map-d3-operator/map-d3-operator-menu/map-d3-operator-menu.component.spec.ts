import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3OperatorMenuComponent } from './map-d3-operator-menu.component';

describe('MapD3OperatorMenuComponent', () => {
  let component: MapD3OperatorMenuComponent;
  let fixture: ComponentFixture<MapD3OperatorMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapD3OperatorMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapD3OperatorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
