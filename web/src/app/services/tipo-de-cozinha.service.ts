import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDeCozinhaService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getCuisineTypes(): Observable<any> {
    return this.http.get(`${this.API}/cuisine-types`);
  }

  create(cuisineType: any): Observable<any> {
    if (cuisineType.id) {
      return this.http.put(`${this.API}/admin/tipos-de-cozinha/${cuisineType.id}`, cuisineType);
    }
    return this.http.post(`${this.API}/admin/tipos-de-cozinha`, cuisineType);
  }

  remove(tipoDeCozinha: any) {
    return this.http.delete(`${this.API}/admin/tipos-de-cozinha/${tipoDeCozinha.id}`);
  }

}
