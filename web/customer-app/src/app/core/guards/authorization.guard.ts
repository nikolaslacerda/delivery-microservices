import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {AuthenticationService} from 'src/app/core/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router,
              private toastr: ToastrService,
              private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = route.data.role;
    if (role && this.authService.hasRole(role)) {
      return true;
    }
    this.toastr.error('Please login to access', 'Access Denied');
    this.router.navigate(['/login']);
    return false;
  }
}
