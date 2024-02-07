import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumsTableComponent } from './stadiums-table.component';

describe('StadiumsTableComponent', () => {
  let component: StadiumsTableComponent;
  let fixture: ComponentFixture<StadiumsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadiumsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
