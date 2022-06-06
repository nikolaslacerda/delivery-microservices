import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {RestaurantResponse} from '../../shared/model/response/restaurant-response.model';
import {RestaurantService} from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  OAUTH_CLIENT = 'root';
  OAUTH_SECRET = 'root';
  tokenData: any;
  isAuthenticated = false;
  private API = environment.baseUrl;

  constructor(private http: HttpClient,
              private restaurantService: RestaurantService,
              private router: Router) {
    if (localStorage.getItem('session')) {
      // @ts-ignore
      this.tokenData = JSON.parse(localStorage.getItem('session'));
      this.isAuthenticated = true;
    }
  }

  signIn(email: any, password: any): any {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(this.OAUTH_CLIENT + ':' + this.OAUTH_SECRET)
      })
    };

    const body = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password')
      .set('scope', 'any');

    return this.http.post(`${this.API}/oauth/token`, body, HTTP_OPTIONS)
      .pipe(map((tokenData: any) => {
        this.tokenData = tokenData;
        localStorage.setItem('session', JSON.stringify(this.tokenData));
        tokenData.id = 1;
        localStorage.setItem('session', JSON.stringify(this.tokenData));
        //this.getUserId().subscribe(data => {
        // this.getPartnerRestaurant(data?.username).subscribe(restaurantInfo => {
        //   tokenData.id = restaurantInfo.id;
        //   localStorage.setItem('session', JSON.stringify(this.tokenData)); // temporary solution
        // });
        //});
        return tokenData;
      }));
  }

  getPartnerRestaurant(partnerId: any): Observable<any> {
    return this.http.get<any>(`${this.API}/partner/customer/${partnerId}/restaurant`);
  }

  getUserId(): Observable<any> {
    return this.http.get<any>(`${this.API}/oauth/me`);
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
