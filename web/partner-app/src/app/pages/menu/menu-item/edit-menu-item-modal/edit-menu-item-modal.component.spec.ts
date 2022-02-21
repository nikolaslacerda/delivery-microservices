import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuItemModalComponent } from './edit-menu-item-modal.component';

describe('EditMenuItemModalComponent', () => {
  let component: EditMenuItemModalComponent;
  let fixture: ComponentFixture<EditMenuItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMenuItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenuItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
