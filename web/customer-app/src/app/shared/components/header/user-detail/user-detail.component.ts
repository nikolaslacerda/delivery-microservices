import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private authService: AuthenticationService, private route: Router) {
  }

  ngOnInit() {
  }

  getUser() {
    return this.authService.currentUser;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.navigateToLogin();
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }

  navigateToOrders() {
    this.route.navigate(['/orders']);
  }

  navigateToEdit() {
    this.route.navigate(['/user/edit']);
  }


}
