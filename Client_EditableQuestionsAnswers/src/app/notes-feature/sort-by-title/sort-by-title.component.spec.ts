import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByTitleComponent } from './sort-by-title.component';

describe('SortByTitleComponent', () => {
  let component: SortByTitleComponent;
  let fixture: ComponentFixture<SortByTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortByTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
