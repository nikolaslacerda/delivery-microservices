import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private API = environment.baseUrl;
  private DISTANCE_API = environment.baseUrl + "/distances";

  constructor(private http: HttpClient) {
  }

  porId(id: string): Observable<any> {
    return this.http.get(`${this.API}/restaurants/${id}`);
  }

  porIds(ids): Observable<any> {
    return this.http.get(`${this.API}/restaurants?ids=${ids}`);
  }

  maisProximosPorCep(cep: string): Observable<any> {
    return this.http.get(`${this.DISTANCE_API}/restaurants/nearest/${cep}`);
  }

  maisProximosPorCepETipoDeCozinha(cep: string, tipoDeCozinhaId: string): Observable<any> {
    return this.http.get(`${this.DISTANCE_API}/restaurants/nearest/${cep}/cuisine-type/${tipoDeCozinhaId}`);
  }

  distanciaPorCepEId(cep: string, restauranteId: string): Observable<any> {
    return this.http.get(`${this.DISTANCE_API}/restaurants/${cep}/restaurant/${restauranteId}`);
  }

  formasDePagamento(restaurante): Observable<any>  {
    return this.http.get(`${this.API}/restaurants/${restaurante.id}/payment-methods`);
  }

  doUsuario(user: any): Observable<any> {
    return this.http.get(`${this.API}/partners/restaurants/user/${user.username}`);
  }

  parceiroPorId(id: string): Observable<any> {
    return this.http.get(`${this.API}/partners/restaurants/${id}`);
  }

  salva(restaurante): Observable<any> {
    if (restaurante.id) {
      return this.http.put(`${this.API}/partners/restaurants/${restaurante.id}`, restaurante);
    }
    return this.http.post(`${this.API}/partners/restaurants`, restaurante);
  }

  emAprovacao(): Observable<any> {
    return this.http.get(`${this.API}/admin/restaurants/pending`);
  }

  aprova(restaurante): Observable<any> {
    return this.http.patch(`${this.API}/admin/restaurants/${restaurante.id}`, restaurante);
  }

  porCepEIdComDistancia(cep: string, restauranteId: string): Observable<any> {
    return this.http.get(`${this.API}/restaurants-with-distance/${cep}/restaurant/${restauranteId}`);
  }

}
