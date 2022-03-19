import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {RestaurantResponse} from '../model/restaurant-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenData: any;
  isAuthenticated = false;
  private API = environment.baseUrl;

  constructor(private http: HttpClient,
              private router: Router) {
    if (localStorage.getItem('session')) {
      // @ts-ignore
      this.tokenData = JSON.parse(localStorage.getItem('session'));
      this.isAuthenticated = true;
    }
  }

  signIn(email: any, password: any): any {
    return this.http.post(`${this.API}/partner/login`, {email, password})
      .pipe(map((tokenData: any) => {
        this.tokenData = tokenData;
        localStorage.setItem('session', JSON.stringify(this.tokenData));
      }));
  }

  signOut(): any {
    localStorage.removeItem('session');
    this.tokenData = undefined;
    this.router.navigate(['/login']);
  }

  getRestaurantId(): number {
    return this.tokenData.id;
  }

  getRestaurantInfo(): Observable<RestaurantResponse> {
    return this.http.get(`${this.API}/restaurants/${this.tokenData.id}`)
      .pipe(
        map((authData1: any) => {
          return authData1 as RestaurantResponse;
        })
      );
  }

  signUp(partner: any): Observable<any> {
    return this.http.post(`${this.API}/partners`, partner);
  }
}
