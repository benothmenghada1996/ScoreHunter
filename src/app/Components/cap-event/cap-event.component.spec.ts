import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapEventComponent } from './cap-event.component';

describe('CapEventComponent', () => {
  let component: CapEventComponent;
  let fixture: ComponentFixture<CapEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
