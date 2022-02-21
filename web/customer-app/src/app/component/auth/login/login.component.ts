import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from 'src/app/services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  navigateTo: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.navigateTo = this.activatedRoute.snapshot.params.to || '/';
  }

  login() {
    this.authenticationService.login(this.loginForm.value)
      .subscribe(x => console.log(x), error => console.log(error)
        , () => {
          this.router.navigate([this.navigateTo]);
        });
  }
}
