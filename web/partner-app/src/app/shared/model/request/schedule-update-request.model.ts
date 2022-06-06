import {formatDate} from '@angular/common';

export class ScheduleUpdateRequest {
  dayOfWeek: string;
  openingHours: string;
  closingHours: string;
  active: boolean;

  constructor(model: any = {}) {
    this.dayOfWeek = model.dayOfWeek;
    this.openingHours = formatDate(model.openingHours, 'HH:mm', 'en');
    this.closingHours = formatDate(model.closingHours, 'HH:mm', 'en');
    this.active = model.active;
  }
}
