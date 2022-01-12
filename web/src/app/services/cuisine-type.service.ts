import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuisineTypeService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getCuisineTypes(): Observable<any> {
    return this.http.get(`${this.API}/cuisine-types`);
  }

  createCuisineType(cuisineType: any): Observable<any> {
    if (cuisineType.id) {
      return this.http.put(`${this.API}/admin/cuisine-type/${cuisineType.id}`, cuisineType);
    }
    return this.http.post(`${this.API}/admin/cuisine-type`, cuisineType);
  }

  removeCuisineType(cuisineType: any) {
    return this.http.delete(`${this.API}/admin/cuisine-type/${cuisineType.id}`);
  }

}
