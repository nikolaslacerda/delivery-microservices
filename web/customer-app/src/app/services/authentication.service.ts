import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {NavigationEnd, Router} from '@angular/router';
import {CustomerResponse} from '../models/response/customer.response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private API = environment.baseUrl;

  currentUser: BehaviorSubject<any>;
  currentUserObservable: Observable<any>;
  lastUrl: string;

  constructor(private router: Router,
              private http: HttpClient) {
    this.currentUser = new BehaviorSubject<any>(undefined);
    this.currentUserObservable = this.currentUser.asObservable();
    if (localStorage.getItem('session')) {
      this.currentUser.next(JSON.parse(localStorage.getItem('session')));
    }
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  public get getCurrentUser() {
    return this.currentUser.value;
  }

  login(loginInfo): Observable<any> {
    return this.http.post(`${this.API}/login`, loginInfo)
      .pipe(switchMap((tokenData: any) => {
        this.currentUser.next(tokenData);
        return this.http.get(`${this.API}/customers/${this.getCurrentUser.id}`);
      }))
      .pipe(tap((customerDetails: CustomerResponse) => {
        this.getCurrentUser.role = customerDetails.role;
        localStorage.setItem('session', JSON.stringify(this.getCurrentUser));
        this.currentUser.next(this.getCurrentUser);
      }));
  }

  getUserInfo(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.API}/customers/${this.getCurrentUser.id}`)
      .pipe(
        map((authData1: any) => {
          return authData1;
        })
      );
  }

  hasRole(role: string): boolean {
    if (this.currentUser && this.getCurrentUser.role) {
      return this.getCurrentUser.role === role;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('session');
    this.currentUser.next(undefined);
    this.currentUserObservable = this.currentUser.asObservable();
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
