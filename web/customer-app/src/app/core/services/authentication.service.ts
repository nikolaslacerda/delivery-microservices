import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
  OAUTH_CLIENT = 'root';
  OAUTH_SECRET = 'root';
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
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(this.OAUTH_CLIENT + ':' + this.OAUTH_SECRET)
      })
    };
    const body = new HttpParams()
      .set('username', loginRequest.email)
      .set('password', loginRequest.password)
      .set('grant_type', 'password')
      .set('scope', 'any');
    return this.http.post<LoginResponse>(`${this.API}/oauth/token`, body, HTTP_OPTIONS)
      .pipe(
        map((token: LoginResponse) => {
          this.currentUser.next(token);
          localStorage.setItem('session', JSON.stringify(this.getCurrentUser));
          this.getUserId().subscribe(data => {
            token.id = data?.username;
            this.currentUser.next(token);
            localStorage.setItem('session', JSON.stringify(this.getCurrentUser)); // temporary solution
          });
          return token;
        })
      );
  }

  getUserId(): Observable<any> {
    return this.http.get<any>(`${this.API}/oauth/me`);
  }

  getUserInfo(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.API}/user/${this.getCurrentUser.id}`)
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
