import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStadiumComponent } from './add-stadium.component';

describe('AddStadiumComponent', () => {
  let component: AddStadiumComponent;
  let fixture: ComponentFixture<AddStadiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStadiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
