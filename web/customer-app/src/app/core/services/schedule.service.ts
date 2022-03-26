import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';

import {DayOfWeekUtils} from '../../shared/utils/day-of-week.utils';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getRestaurantSchedule(restaurantId): Observable<any> {
    const params = new HttpParams().set('restaurantId', restaurantId);
    return this.http.get(`${this.API}/schedules`, {params})
      .pipe(
        map(days => this.sortDays(days))
      );
  }

  sortDays(days) {
    return days.sort(
      (a, b) => DayOfWeekUtils.compare(a.dayOfWeek, b.dayOfWeek)
    );
  }
}
