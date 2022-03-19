import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/restaurants']);
    }
  }

  ngOnInit() {
  }

  signUp() {

  }
}
