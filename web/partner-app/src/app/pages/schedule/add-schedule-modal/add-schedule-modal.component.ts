import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ScheduleService} from '../../../core/services/schedule.service';
import {formatDate} from '@angular/common';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-add-schedule-modal',
  templateUrl: './add-schedule-modal.component.html',
  styleUrls: ['./add-schedule-modal.component.css']
})
export class AddScheduleModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  schedule: any = {};
  scheduleForm = this.fb.group({
    dayOfWeek: ['', Validators.required],
    openingTime: ['', Validators.required],
    closingTime: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              public bsModalRef: BsModalRef,
              private authService: AuthService,
              private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
  }

  emitAdd(schedule: any): void {
    this.event.emit(schedule);
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

  addSchedule(): void {
    this.schedule.dayOfWeek = this.scheduleForm.value.dayOfWeek;
    this.schedule.openingTime = formatDate(this.scheduleForm.value.openingTime, 'HH:mm', 'en');
    this.schedule.closingTime = formatDate(this.scheduleForm.value.closingTime, 'HH:mm', 'en');
    this.schedule.active = true;
    this.schedule.restaurantId = 1;
    this.scheduleService.saveRestaurantSchedule(this.authService.getRestaurantId(), this.schedule).subscribe(schedule => {
      this.emitAdd(schedule);
      this.hide();
    });
  }

}
