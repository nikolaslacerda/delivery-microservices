import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DayOfWeekService {

  dayOfWeek = [
    { nome: 'Monday', valor: 'MONDAY', ordem: 1},
    { nome: 'Tuesday', valor: 'TUESDAY', ordem: 2},
    { nome: 'Wednesday', valor: 'WEDNESDAY', ordem: 3},
    { nome: 'Thursday', valor: 'THURSDAY', ordem: 4},
    { nome: 'Friday', valor: 'FRIDAY', ordem: 5},
    { nome: 'Saturday', valor: 'SATURDAY', ordem: 6},
    { nome: 'Sunday', valor: 'SUNDAY', ordem: 7},
  ];

  findValue(valor) {
    return this.dayOfWeek.find(d => d.valor === valor);
  }

  compare(a, b) {
    return  this.findValue(a).ordem - this.findValue(b).ordem;
  }

}
