import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleModalComponent } from './add-schedule-modal.component';

describe('AddScheduleModalComponent', () => {
  let component: AddScheduleModalComponent;
  let fixture: ComponentFixture<AddScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScheduleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
