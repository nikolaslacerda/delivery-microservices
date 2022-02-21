import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduleModalComponent } from './edit-schedule-modal.component';

describe('EditScheduleModalComponent', () => {
  let component: EditScheduleModalComponent;
  let fixture: ComponentFixture<EditScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditScheduleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
