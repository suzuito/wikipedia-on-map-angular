import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3OperatorComponent } from './map-d3-operator.component';

describe('MapD3OperatorComponent', () => {
  let component: MapD3OperatorComponent;
  let fixture: ComponentFixture<MapD3OperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapD3OperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapD3OperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
