import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad, CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canLoad(route: Route): boolean {
    const loggedIn = this.authenticationService.isLoggedIn();
    if (!loggedIn) {
      this.authenticationService.navigateToLogin(`/${route.path}`);
    }
    return loggedIn;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loggedIn = this.authenticationService.isLoggedIn();
    if (!loggedIn) {
      this.authenticationService.navigateToLogin(`/${route.routeConfig.path}`);
    }
    return loggedIn;
  }
}
