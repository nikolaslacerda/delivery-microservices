import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {CuisineTypeResponse} from '../../shared/models/response/cuisine-type.response';

@Injectable({
  providedIn: 'root'
})
export class CuisineTypeService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getCuisineTypes(): Observable<CuisineTypeResponse[]> {
    return this.http.get<CuisineTypeResponse[]>(`${this.API}/restaurants/cuisine-types`);
  }
}
