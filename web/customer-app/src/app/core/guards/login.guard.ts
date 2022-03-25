import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from 'src/app/core/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad, CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canLoad(route: Route): boolean {
    const isLoggedIn = this.authService.isLoggedIn()
    if (!isLoggedIn) {
      this.authService.navigateToLogin(`/${route.path}`);
    }
    return isLoggedIn;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn()
    if (!isLoggedIn) {
      this.authService.navigateToLogin(`/${route.routeConfig.path}`);
    }
    return isLoggedIn;
  }
}
