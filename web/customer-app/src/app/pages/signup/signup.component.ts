import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../core/services/authentication.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerRequest} from '../../shared/models/request/customer.request.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/restaurants']);
    }
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      phone: this.fb.control('', [Validators.required, Validators.minLength(11)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      passwordConfirmation: this.fb.control('', [Validators.required]),
    });
  }

  get firstName(): AbstractControl {
    return this.signUpForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.signUpForm.get('lastName');
  }

  get phone(): AbstractControl {
    return this.signUpForm.get('phone');
  }

  get email(): AbstractControl {
    return this.signUpForm.get('email');
  }

  get password(): AbstractControl {
    return this.signUpForm.get('password');
  }

  get passwordConfirmation(): AbstractControl {
    return this.signUpForm.get('passwordConfirmation');
  }

  signUp() {
    this.authenticationService.createCustomer(new CustomerRequest(this.signUpForm.value))
      .subscribe(() => this.toastr.success('Confirm to activate your account', 'Account Created! An email has been sent'),
        error => console.log(error),
        () => {
          this.router.navigate(['/login']);
        });
  }

  validatePassword() {
    return this.password.value === this.passwordConfirmation.value;
  }
}
