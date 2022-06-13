export interface ScheduleResponse {
  id: number;
  restaurantId: number;
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  active: boolean;
}
