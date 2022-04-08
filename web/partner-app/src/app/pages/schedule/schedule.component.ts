import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../services/schedule.service';
import {DayOfWeekUtils} from '../../shared/utils/dayOfWeek.utils';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EditScheduleModalComponent} from './edit-schedule-modal/edit-schedule-modal.component';
import {AddScheduleModalComponent} from './add-schedule-modal/add-schedule-modal.component';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ScheduleResponse} from '../../model/schedule-response.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  isLoading = true;
  schedule: ScheduleResponse[] = [];
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
        this.schedule = schedule;
        this.isLoading = false;
      });
  }

  deleteSchedule(schedule: any): void {
    const restaurantId = this.authService.getRestaurantId();
    this.scheduleService.deleteRestaurantSchedule(restaurantId, schedule).subscribe(() => {
      this.schedule = this.schedule.filter(h => h !== schedule);
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
      this.schedule.push(schedule);
      this.schedule = this.scheduleService.sortDays(this.schedule);
      this.showSuccessCreated();
    });
  }

  openEditModal(schedule: ScheduleResponse): void {
    const initialState = {schedule};
    this.bsModalRef = this.modalService.show(EditScheduleModalComponent, {initialState});
    this.bsModalRef.content.event
      .subscribe(() => this.showSuccessUpdate());
  }

  showSuccessCreated(): void {
    this.toastr.success('Schedule adicionado com sucesso', 'Sucesso', {
      timeOut: 3000,
    });
  }

  showSuccessUpdate(): void {
    this.toastr.success('Schedule atualizado com sucesso', 'Sucesso', {
      timeOut: 3000,
    });
  }

  showSuccessDelete(): void {
    this.toastr.success('Schedule removido com sucesso', 'Sucesso', {
      timeOut: 3000,
    });
  }

}
