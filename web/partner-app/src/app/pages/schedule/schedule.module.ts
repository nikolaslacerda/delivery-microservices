import {NgModule} from '@angular/core';
import {ScheduleComponent} from './schedule.component';
import {AddScheduleModalComponent} from './add-schedule-modal/add-schedule-modal.component';
import {EditScheduleModalComponent} from './edit-schedule-modal/edit-schedule-modal.component';
import {SharedModule} from '../../shared/shared.module';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';

@NgModule({
  declarations: [
    ScheduleComponent,
    AddScheduleModalComponent,
    EditScheduleModalComponent
  ],
  imports: [
    SharedModule,
    TimepickerModule.forRoot()
  ]
})
export class ScheduleModule {
}
