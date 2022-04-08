import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ScheduleService} from '../../../services/schedule.service';
import {formatDate} from '@angular/common';
import {ScheduleResponse} from '../../../model/schedule-response.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-edit-schedule-modal',
  templateUrl: './edit-schedule-modal.component.html',
  styleUrls: ['./edit-schedule-modal.component.css']
})
export class EditScheduleModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  schedule = {} as ScheduleResponse;
  scheduleForm = this.fb.group({
    dayOfWeek: ['', Validators.required],
    openingTime: ['', Validators.required],
    closingTime: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private scheduleService: ScheduleService,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this._populateForm();
  }

  emitAdd(): void {
    this.event.emit();
  }

  private _populateForm(): void {
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
    });
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

  updateSchedule(): void {
    this.schedule.dayOfWeek = this.scheduleForm.value.dayOfWeek;
    this.schedule.openingTime = formatDate(this.scheduleForm.value.openingTime, 'HH:mm', 'en');
    this.schedule.closingTime = formatDate(this.scheduleForm.value.closingTime, 'HH:mm', 'en');
    this.scheduleService.editSchedule(this.authService.getRestaurantId(), this.schedule).subscribe(item => {
      this.emitAdd();
      this.hide();
    });
  }

}
