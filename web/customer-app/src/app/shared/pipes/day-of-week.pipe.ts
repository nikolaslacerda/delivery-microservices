import {Pipe, PipeTransform} from '@angular/core';
import {DayOfWeekUtils} from '../utils/day-of-week.utils';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  transform(value: string): string {
    const dayOfWeek = DayOfWeekUtils.findValue(value);
    if (dayOfWeek) {
      return dayOfWeek.name;
    }
    return value;
  }
}
