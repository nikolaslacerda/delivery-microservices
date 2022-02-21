import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuItemModalComponent } from './add-menu-item-modal.component';

describe('AddMenuItemModalComponent', () => {
  let component: AddMenuItemModalComponent;
  let fixture: ComponentFixture<AddMenuItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
