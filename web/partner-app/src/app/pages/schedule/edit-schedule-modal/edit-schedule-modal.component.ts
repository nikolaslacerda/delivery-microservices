import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ScheduleService} from '../../../core/services/schedule.service';
import {ScheduleResponse} from '../../../shared/model/response/schedule-response.model';
import {AuthService} from '../../../core/services/auth.service';
import {ScheduleUpdateRequest} from '../../../shared/model/request/schedule-update-request.model';

@Component({
  selector: 'app-edit-schedule-modal',
  templateUrl: './edit-schedule-modal.component.html',
  styleUrls: ['./edit-schedule-modal.component.css']
})
export class EditScheduleModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  buttonLoading = false;
  schedule = {} as ScheduleResponse;
  scheduleForm = this.fb.group({
    dayOfWeek: ['', Validators.required],
    openingTime: ['', Validators.required],
    closingTime: ['', Validators.required],
    active: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private scheduleService: ScheduleService,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.populateForm();
  }

  emitUpdateBusinessHourEvent(updatedItem: any): void {
    this.event.emit(updatedItem);
  }

  private populateForm(): void {
    const openingHour = new Date();
    openingHour.setHours(Number(this.schedule.openingTime.split(':')[0]));
    openingHour.setMinutes(Number(this.schedule.openingTime.split(':')[1]));

    const closingHour = new Date();
    closingHour.setHours(Number(this.schedule.closingTime.split(':')[0]));
    closingHour.setMinutes(Number(this.schedule.closingTime.split(':')[1]));

    this.scheduleForm.patchValue({
      dayOfWeek: this.schedule.dayOfWeek,
      openingTime: openingHour,
      closingTime: closingHour,
      active: this.schedule.active
    });
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

  updateSchedule(): void {
    this.buttonLoading = true;
    this.scheduleService.editSchedule(this.authService.getRestaurantId(), this.schedule.id, new ScheduleUpdateRequest(this.scheduleForm.value))
      .subscribe((updatedItem: ScheduleResponse) => {
        this.emitUpdateBusinessHourEvent(updatedItem);
        this.hide();
      });
  }
}
