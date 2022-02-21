import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ScheduleService} from '../../../services/schedule.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-edit-schedule-modal',
  templateUrl: './edit-schedule-modal.component.html',
  styleUrls: ['./edit-schedule-modal.component.css']
})
export class EditScheduleModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  scheduleForm = this.fb.group({
    dayOfWeek: ['', Validators.required],
    openingTime: ['', Validators.required],
    closingTime: ['', Validators.required],
  });
  list: any[] = [];

  constructor(@Inject(LOCALE_ID) private locale: string,
              private fb: FormBuilder,
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
    openingHour.setHours(this.list[0].schedule.openingTime.split(':')[0]);
    openingHour.setMinutes(this.list[0].schedule.openingTime.split(':')[1]);

    const closingHour = new Date();
    closingHour.setHours(this.list[0].schedule.closingTime.split(':')[0]);
    closingHour.setMinutes(this.list[0].schedule.closingTime.split(':')[1]);

    this.scheduleForm.patchValue({
      dayOfWeek: this.list[0].schedule.dayOfWeek,
      openingTime: openingHour,
      closingTime: closingHour,
    });
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

  updateSchedule(): void {
    this.list[0].schedule.dayOfWeek = this.scheduleForm.value.dayOfWeek;
    this.list[0].schedule.openingTime = formatDate(this.scheduleForm.value.openingTime, 'HH:mm', this.locale);
    this.list[0].schedule.closingTime = formatDate(this.scheduleForm.value.closingTime, 'HH:mm', this.locale);
    this.scheduleService.saveRestaurantSchedule(this.list[0].schedule).subscribe(item => {
      this.emitAdd();
      this.hide();
    });
  }

}
