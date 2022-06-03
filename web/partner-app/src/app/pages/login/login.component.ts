import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated) {
      this.router.navigateByUrl('/home');
    }

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    this.isLoading = true;
    this.authService.signIn(this.email.value, this.password.value).subscribe(() => {
      this.router.navigateByUrl('/home');
      this.isLoading = false;
    });
  }

}
