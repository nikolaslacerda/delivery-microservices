import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuCategoryModalComponent } from './edit-menu-category-modal.component';

describe('EditMenuCategoryModalComponent', () => {
  let component: EditMenuCategoryModalComponent;
  let fixture: ComponentFixture<EditMenuCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMenuCategoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenuCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
