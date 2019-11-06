import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntryComponent } from './new-entry.component';

describe('NewEntryComponent', () => {
  let component: NewEntryComponent;
  let fixture: ComponentFixture<NewEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEntryComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
