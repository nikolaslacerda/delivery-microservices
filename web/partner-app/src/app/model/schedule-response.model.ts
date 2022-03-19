export class ScheduleResponse {

  id: number;
  restaurantId: number;
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  active: boolean;

  constructor(model: any = {}) {
    this.id = model.id;
    this.restaurantId = model.restaurantId;
    this.dayOfWeek = model.dayOfWeek;
    this.openingTime = model.openingTime;
    this.closingTime = model.closingTime;
    this.active = model.active;
  }
}
