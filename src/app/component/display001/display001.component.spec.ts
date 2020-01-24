import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Display001Component } from './display001.component';

describe('Display001Component', () => {
  let component: Display001Component;
  let fixture: ComponentFixture<Display001Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Display001Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Display001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
