import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DayOfWeekUtils {

  dayOfWeek = [
    {name: 'Monday', value: 'MONDAY', index: 1},
    {name: 'Tuesday', value: 'TUESDAY', index: 2},
    {name: 'Wednesday', value: 'WEDNESDAY', index: 3},
    {name: 'Thursday', value: 'THURSDAY', index: 4},
    {name: 'Friday', value: 'FRIDAY', index: 5},
    {name: 'Saturday', value: 'SATURDAY', index: 6},
    {name: 'Sunday', value: 'SUNDAY', index: 7},
  ];

  findValue(value: string): any {
    return this.dayOfWeek.find(day => day.value === value);
  }

  compare(a: string, b: string): number {
    return this.findValue(a).index - this.findValue(b).index;
  }

}
