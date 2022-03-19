import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {AuthenticationService} from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router,
              private toaster: ToastrService,
              private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const role = route.data.role;
    if (role && this.authService.hasRole(role)) {
      return true;
    }
    this.toaster.error('Please login to access', 'Access Denied');
    this.router.navigate(['/login']);
    return false;
  }
}
