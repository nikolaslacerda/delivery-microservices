import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../core/services/schedule.service';
import {DayOfWeekUtils} from '../../shared/utils/dayOfWeek.utils';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EditScheduleModalComponent} from './edit-schedule-modal/edit-schedule-modal.component';
import {AddScheduleModalComponent} from './add-schedule-modal/add-schedule-modal.component';
import {AuthService} from '../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ScheduleResponse} from '../../shared/model/response/schedule-response.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  isLoading = true;
  schedules: ScheduleResponse[] = [];
  daysOfWeek: Array<any> = [];
  bsModalRef: BsModalRef | undefined;

  constructor(private scheduleService: ScheduleService,
              private modalService: BsModalService,
              private authService: AuthService,
              public toastr: ToastrService,
              private dayOfWeekUtils: DayOfWeekUtils) {
  }

  ngOnInit(): void {
    const restaurantId = this.authService.getRestaurantId();
    this.daysOfWeek = this.dayOfWeekUtils.dayOfWeek;
    this.scheduleService.getRestaurantSchedule(restaurantId)
      .subscribe((schedule: ScheduleResponse[]) => {
        this.schedules = this.scheduleService.sortDays(schedule);
        this.isLoading = false;
      });
  }

  deleteSchedule(schedule: any): void {
    const restaurantId = this.authService.getRestaurantId();
    this.scheduleService.deleteRestaurantSchedule(restaurantId, schedule)
      .subscribe(() => {
        this.schedules = this.schedules.filter(h => h !== schedule);
        this.showSuccessDelete();
      });
  }

  updateScheduleStatus(isChecked: any, schedule: any): void {
    const restaurantId = this.authService.getRestaurantId();
    schedule.active = isChecked.currentTarget.checked;
    this.scheduleService.editSchedule(restaurantId, schedule)
      .subscribe();
  }

  openAddModal(): void {
    this.bsModalRef = this.modalService.show(AddScheduleModalComponent);
    this.bsModalRef.content.event.subscribe((schedule: any) => {
      this.schedules.push(schedule);
      this.schedules = this.scheduleService.sortDays(this.schedules);
      this.showSuccessCreated();
    });
  }

  openEditModal(schedule: ScheduleResponse): void {
    const initialState = {schedule};
    this.bsModalRef = this.modalService.show(EditScheduleModalComponent, {initialState});
    this.bsModalRef.content.event
      .subscribe((updatedSchedule: ScheduleResponse) => {
        schedule.dayOfWeek = updatedSchedule.dayOfWeek;
        schedule.openingTime = updatedSchedule.openingTime;
        schedule.closingTime = updatedSchedule.closingTime;
        schedule.active = updatedSchedule.active;
        this.schedules = this.scheduleService.sortDays(this.schedules);
        this.showSuccessUpdate();
      });
  }

  showSuccessCreated(): void {
    this.toastr.success('Schedule created successfully', 'Success', {
      timeOut: 3000,
    });
  }

  showSuccessUpdate(): void {
    this.toastr.success('Schedule updated successfully', 'Success', {
      timeOut: 3000,
    });
  }

  showSuccessDelete(): void {
    this.toastr.success('Schedule deleted successfully', 'Success', {
      timeOut: 3000,
    });
  }

}
