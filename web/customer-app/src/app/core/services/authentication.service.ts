import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {NavigationEnd, Router} from '@angular/router';
import {CustomerResponse} from '../../shared/models/response/customer.response.model';
import {LoginResponse} from '../../shared/models/response/login-response.model';
import {LoginRequest} from '../../shared/models/request/login.request';
import {CustomerRequest} from '../../shared/models/request/customer.request.model';

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

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/login`, loginRequest)
      .pipe(
        map((token: LoginResponse) => {
          this.currentUser.next(token);
          localStorage.setItem('session', JSON.stringify(this.getCurrentUser));
          return token;
        })
      );
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

  createCustomer(userInfo: CustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(`${this.API}/customers`, userInfo);
  }

  updateCustomer(userId: number, userData: CustomerRequest): Observable<CustomerResponse> {
    return this.http.patch<CustomerResponse>(`${this.API}/customers/${userId}`, userData);
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser !== undefined;
  }

  navigateToLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', path]);
  }
}
