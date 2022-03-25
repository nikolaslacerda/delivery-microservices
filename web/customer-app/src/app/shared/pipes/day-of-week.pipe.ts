import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeekService } from '../../core/services/day-of-week.service';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  constructor(private diaDaSemanaService: DayOfWeekService) {
  }

  transform(value: any): string {
    const dayOfWeek = this.diaDaSemanaService.findValue(value);
    if (dayOfWeek) {
      return dayOfWeek.nome;
    }
    return value;
  }
}
