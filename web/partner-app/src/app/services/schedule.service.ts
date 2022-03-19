import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DayOfWeekUtils} from '../shared/utils/dayOfWeek.utils';
import {map} from 'rxjs/operators';
import {ScheduleResponse} from '../model/schedule-response.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient,
              private dayOfWeekUtils: DayOfWeekUtils) {
  }

  saveRestaurantSchedule(schedule: any): Observable<any> {
    if (schedule.id) {
      return this.http.put(`${this.API}/schedules/${schedule.id}`, schedule);
    } else {
      return this.http.post(`${this.API}/schedules`, schedule);
    }
  }

  getRestaurantSchedule(restaurantId: any): Observable<ScheduleResponse[]> {
    const params = new HttpParams().set('restaurantId', restaurantId);
    return this.http.get<ScheduleResponse[]>(`${this.API}/schedules`, {params})
      .pipe(
        map((days: any) => this.sortDays(days))
      );
  }

  deleteRestaurantSchedule(schedule: any): Observable<void> {
    return this.http.delete<void>(`${this.API}/schedules/${schedule.id}`);
  }

  sortDays(days: any): any {
    return days.sort(
      (a: any, b: any) => this.dayOfWeekUtils.compare(a.dayOfWeek, b.dayOfWeek)
    );
  }
}
