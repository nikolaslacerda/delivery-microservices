import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

class RestaurantModel {
  public id?: string;
  public name: string;
  public mainCategory: string;
  public minDeliveryTime: number;
  public maxDeliveryTime: number;
  public deliveryFee: number;
  public description: string;
  public userRating: number;
  public imageUrl: string;
  public menuId: number;
  public addressId: number;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.mainCategory = model.displayName;
    this.minDeliveryTime = model.minDeliveryTime;
    this.maxDeliveryTime = model.maxDeliveryTime;
    this.deliveryFee = model.deliveryFee;
    this.description = model.description;
    this.userRating = model.userRating;
    this.imageUrl = model.imageUrl;
    this.menuId = model.menuId;
    this.addressId = model.addressId;
  }
}

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

  getRestaurantInfo(): Observable<RestaurantModel> {
    return this.http.get(`${this.API}/restaurants/${this.tokenData.id}`)
      .pipe(
        map((authData1: any) => {
          return authData1 as RestaurantModel;
        })
      );
  }

  signUp(partner: any): Observable<any> {
    return this.http.post(`${this.API}/partners`, partner);
  }
}
