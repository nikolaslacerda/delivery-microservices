import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from 'src/app/core/services/authentication.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  navigateTo: string;

  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required])
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/restaurants']);
    }
    this.navigateTo = this.activatedRoute.snapshot.params.to || '/';
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  login() {
    this.authenticationService.login(this.loginForm.value)
      .subscribe(x => console.log(x), error => console.log(error)
        , () => {
          this.router.navigate([this.navigateTo]);
        });
  }
}
