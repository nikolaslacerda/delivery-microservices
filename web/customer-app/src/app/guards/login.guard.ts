import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad, CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canLoad(route: Route): boolean {
    if (!this.authService.isLoggedIn()) {
      this.authService.navigateToLogin(`/${route.path}`);
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.authService.navigateToLogin(`/${route.routeConfig.path}`);
    }
    return false;
  }
}
