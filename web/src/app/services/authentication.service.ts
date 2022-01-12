import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private API = environment.baseUrl + '/oauth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    if (this.currentUserValue && this.currentUserValue.role) {
      return this.currentUserValue.role === role;
    }
    return false;
  }

  login(loginInfo): Observable<any> {

    const headers = {
      Authorization: 'Basic ' + btoa('root:root'),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    const body = new HttpParams()
      .set('username', loginInfo.username)
      .set('password', loginInfo.password)
      .set('scope', 'any')
      .set('grant_type', 'password');


    return this.http.post(`${this.API}/token`, body, {headers})
      .pipe(switchMap((tokenData: any) => {
          if (tokenData && tokenData.access_token) {
            localStorage.setItem('currentUser', JSON.stringify(tokenData));
            this.currentUserSubject.next(tokenData);
            return this.http.get(`${this.API}/me`)
              .pipe(
                map((userData: any) => {
                  tokenData.username = userData.username;
                  tokenData.role = userData.role.replace('ROLE_', '');
                  userData.role = userData.role.replace('ROLE_', '');
                  localStorage.setItem('currentUser', JSON.stringify(tokenData));
                  this.currentUserSubject.next(userData);
                  return userData;
                })
              );
          }
        })
      );
  }

  getUserInfo() {
    return this.http.get(`${this.API}/me`)
      .pipe(
        map((authData1: any) => {
          if (authData1) {
            console.log(authData1);
            this.currentUserSubject.next(authData1);
          } else {
            console.log('?');
          }
          return authData1;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  registraParceiro(userInfo: any): Observable<any> {
    return this.http.post(`${this.API}/parceiro`, userInfo);
  }

}
