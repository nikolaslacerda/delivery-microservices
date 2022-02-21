import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private API = environment.baseUrl; // + '/oauth';
  currentUser: Observable<any>;
  lastUrl: string;

  user: BehaviorSubject<any>;
  restaurantData: any;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new BehaviorSubject<any>(undefined);
    this.currentUser = this.user.asObservable();

    if (localStorage.getItem('session')) {
      this.user.next(JSON.parse(localStorage.getItem('session'))) ;
    }
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  public get getCurrentUser() {
    return this.user.value;
  }

  loginPartner(partnerInfo) {
    return this.http.post(`${this.API}/partner/login`, partnerInfo)
      .pipe(switchMap((tokenData: any) => {
        this.user.next(tokenData);
        return this.http.get(`${this.API}/restaurants?partnerId=${this.getCurrentUser.id}`);
      }))
      .pipe(tap((restaurantDetails: any) => {
        this.getCurrentUser.restaurantId = restaurantDetails[0].id;
        localStorage.setItem('session', JSON.stringify(this.getCurrentUser));
        this.user.next( this.getCurrentUser);
      }));
  }

  login(loginInfo): Observable<any> {
    return this.http.post(`${this.API}/login`, loginInfo)
      .pipe(switchMap((tokenData: any) => {
        this.user.next(tokenData);
        return this.http.get(`${this.API}/customers/${this.getCurrentUser.id}`);
      }))
      .pipe(tap((userDetails: any) => {
        this.getCurrentUser.role = userDetails.role;
        localStorage.setItem('session', JSON.stringify(this.getCurrentUser));
        this.user.next(this.getCurrentUser);
      }));
  }

  getUserInfo() {
    return this.http.get(`${this.API}/customers/${this.getCurrentUser.id}`)
      .pipe(
        map((authData1: any) => {
          return authData1;
        })
      );
  }

  getRestaurantInfo() {
    return this.http.get(`${this.API}/restaurants/${this.getCurrentUser.restaurantId}`)
      .pipe(
        map((authData1: any) => {
          return authData1;
        })
      );
  }

  hasRole(role: string): boolean {
    if (this.user && this.getCurrentUser.role) {
      return this.getCurrentUser.role === role;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('session');
    this.user.next(undefined);
    this.router.navigate(['/']);
  }

  registerUser(userInfo: any): Observable<any> {
    return this.http.post(`${this.API}/auth/signup`, userInfo);
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser !== undefined;
  }

  navigateToLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', path]);
  }

  updateCustomer(userId: any, userData: any) {
    return this.http.patch(`${this.API}/customers/${userId}`, userData);
  }
}
