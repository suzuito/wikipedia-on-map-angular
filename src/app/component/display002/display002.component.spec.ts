import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Display002Component } from './display002.component';

describe('Display002Component', () => {
  let component: Display002Component;
  let fixture: ComponentFixture<Display002Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Display002Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Display002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
