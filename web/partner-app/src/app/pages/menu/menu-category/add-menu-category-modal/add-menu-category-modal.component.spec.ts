import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuCategoryModalComponent } from './add-menu-category-modal.component';

describe('AddMenuCategoryModalComponent', () => {
  let component: AddMenuCategoryModalComponent;
  let fixture: ComponentFixture<AddMenuCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuCategoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
