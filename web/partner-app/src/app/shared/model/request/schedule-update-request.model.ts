import {formatDate} from '@angular/common';

export class ScheduleUpdateRequest {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  active: boolean;

  constructor(model: any = {}) {
    this.dayOfWeek = model.dayOfWeek;
    this.openingTime = formatDate(model.openingTime, 'HH:mm', 'en');
    this.closingTime = formatDate(model.closingTime, 'HH:mm', 'en');
    this.active = model.active;
  }
}
