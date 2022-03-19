import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CuisineTypeResponse} from '../model/cuisine-type-response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getCuisineTypes(): Observable<CuisineTypeResponse[]> {
    return this.http.get<CuisineTypeResponse[]>(`${this.API}/cuisine-types`);
  }
}
