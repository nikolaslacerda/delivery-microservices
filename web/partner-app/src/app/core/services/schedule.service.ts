import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DayOfWeekUtils} from '../../shared/utils/dayOfWeek.utils';
import {map} from 'rxjs/operators';
import {ScheduleResponse} from '../../shared/model/response/schedule-response.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient,
              private dayOfWeekUtils: DayOfWeekUtils) {
  }

  saveRestaurantSchedule(restaurantId: number, schedule: any): Observable<any> {
    return this.http.post(`${this.API}/partners/restaurants/${restaurantId}/business-hours`, schedule);
  }

  editSchedule(restaurantId: number, scheduleId: number, schedule: any): Observable<any> {
    return this.http.put(`${this.API}/partners/restaurants/${restaurantId}/business-hours/${scheduleId}`, schedule);
  }

  getRestaurantSchedule(restaurantId: any): Observable<ScheduleResponse[]> {
    return this.http.get<ScheduleResponse[]>(`${this.API}/partners/restaurants/${restaurantId}/business-hours`)
      .pipe(
        map((days: any) => this.sortDays(days))
      );
  }

  deleteRestaurantSchedule(restaurantId: number, schedule: any): Observable<void> {
    return this.http.delete<void>(`${this.API}/partners/restaurants/${restaurantId}/business-hours/${schedule.id}`);
  }

  sortDays(days: any): any {
    return days.sort(
      (a: any, b: any) => {
        if (a.dayOfWeek === b.dayOfWeek) {
          return Number(a.openingTime.split(':')[0]) - Number(b.openingTime.split(':')[0]);
        } else {
          return this.dayOfWeekUtils.compare(a.dayOfWeek, b.dayOfWeek);
        }
      }
    );
  }
}
