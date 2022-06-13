import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ScheduleService} from '../../../core/services/schedule.service';
import {AuthService} from '../../../core/services/auth.service';
import {ScheduleUpdateRequest} from '../../../shared/model/request/schedule-update-request.model';

@Component({
  selector: 'app-add-schedule-modal',
  templateUrl: './add-schedule-modal.component.html',
  styleUrls: ['./add-schedule-modal.component.css']
})
export class AddScheduleModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  buttonLoading = false;
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
    this.buttonLoading = true;
    this.scheduleService.saveRestaurantSchedule(this.authService.getRestaurantId(), new ScheduleUpdateRequest(this.scheduleForm.value))
      .subscribe(schedule => {
        this.emitAdd(schedule);
        this.hide();
      });
  }

}
