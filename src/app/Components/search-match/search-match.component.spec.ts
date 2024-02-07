import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMatchComponent } from './search-match.component';

describe('SearchMatchComponent', () => {
  let component: SearchMatchComponent;
  let fixture: ComponentFixture<SearchMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
