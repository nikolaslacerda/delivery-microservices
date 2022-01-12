import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';

import {DiaDaSemanaService} from './dia-da-semana.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioDeFuncionamentoService {

  private API = environment.baseUrl + '';

  constructor(private http: HttpClient,
              private diaDaSemanaService: DiaDaSemanaService) {
  }

  todosDoRestaurante(restaurante): Observable<any> {
    return this.http.get(`${this.API}/restaurants/${restaurante.id}/business-hours`)
      .pipe(
        map(horarios => this.sortHours(horarios))
      );
  }

  porId(restauranteId, horarioId) {
    return this.http.get(`${this.API}/restaurants/${restauranteId}/business-hours/${horarioId}`);
  }

  salva(horario): Observable<any> {
    if (horario.id) {
      return this.http.put(`${this.API}/partners/restaurants/${horario.restaurante.id}/business-hours/${horario.id}`, horario);
    } else {
      return this.http.post(`${this.API}/partners/restaurants/${horario.restaurante.id}/business-hours`, horario);
    }
  }

  remove(horario) {
    return this.http.delete(`${this.API}/partners/restaurants/${horario.restaurante.id}/business-hours/${horario.id}`);
  }

  sortHours(hours) {
    return hours.sort(
      (a, b) => this.diaDaSemanaService.compara(a.dayOfWeek, b.dayOfWeek)
    );
  }

}
