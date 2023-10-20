import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserPostComponent } from './add-edit-user-post.component';

describe('AddEditUserPostComponent', () => {
  let component: AddEditUserPostComponent;
  let fixture: ComponentFixture<AddEditUserPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUserPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
