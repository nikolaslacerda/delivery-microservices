import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerRequest} from '../../../shared/models/request/customer.request.model';
import {CustomerResponse} from '../../../shared/models/response/customer.response.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: CustomerResponse;

  userForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    phoneNumber: this.fb.control('', [Validators.required, , Validators.minLength(11)]),
    firstName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
    lastName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
    cpf: this.fb.control('', [Validators.required, Validators.minLength(11)]),
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthenticationService,) {
  }

  ngOnInit() {
    this.authService.getUserInfo()
      .subscribe(user => {
        this.user = user;
        this.userForm.patchValue({
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          cpf: this.user.cpf,
        });
      });
  }

  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  get phoneNumber(): AbstractControl {
    return this.userForm.get('phoneNumber');
  }

  get firstName(): AbstractControl {
    return this.userForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.userForm.get('lastName');
  }

  get cpf(): AbstractControl {
    return this.userForm.get('cpf');
  }

  updateUser(): void {
    this.authService.updateCustomer(this.user.id, new CustomerRequest(this.userForm.value))
      .subscribe(() => this.router.navigate(['/']));
  }
}
