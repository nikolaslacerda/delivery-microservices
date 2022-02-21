import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../services/schedule.service';
import {DayOfWeekUtils} from '../../shared/utils/dayOfWeek.utils';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EditScheduleModalComponent} from './edit-schedule-modal/edit-schedule-modal.component';
import {AddScheduleModalComponent} from './add-schedule-modal/add-schedule-modal.component';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  isLoading = true;
  restaurant: any;
  schedule: Array<any> = [];
  daysOfWeek: Array<any> = [];
  bsModalRef: BsModalRef | undefined;

  constructor(private scheduleService: ScheduleService,
              private modalService: BsModalService,
              private authService: AuthService,
              public toastr: ToastrService,
              private dayOfWeekUtils: DayOfWeekUtils) {
  }

  ngOnInit(): void {
    this.restaurant = this.authService.tokenData.id;

    this.daysOfWeek = this.dayOfWeekUtils.dayOfWeek;

    this.scheduleService.getRestaurantSchedule(this.restaurant)
      .subscribe(hours => {
        this.delay(1000).then(() => {
          this.schedule = hours;
          this.isLoading = false;
        });
      });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  deleteSchedule(schedule: any): void {
    this.scheduleService.deleteRestaurantSchedule(schedule).subscribe(() => {
      this.schedule = this.schedule.filter(h => h !== schedule);
      this.showSuccessDelete();
    });
  }

  updateScheduleStatus(isChecked: any, schedule: any): void {
    schedule.active = isChecked.currentTarget.checked;
    this.scheduleService.saveRestaurantSchedule(schedule)
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

  openEditModal(schedule: any): void {
    const initialState = {
      list: [
        {schedule}
      ]
    };
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
