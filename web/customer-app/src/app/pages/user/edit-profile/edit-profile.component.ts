import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerRequest} from '../../../shared/models/request/customer.request.model';
import {CustomerResponse} from '../../../shared/models/response/customer.response.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userForm: FormGroup;
  user: CustomerResponse;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthenticationService,) {
  }

  ngOnInit() {
    this._initForm();
    this.authService.getUserInfo()
      .subscribe(user => {
        this.user = user;
        this._populateForm();
      });

  }

  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  get phone(): AbstractControl {
    return this.userForm.get('phone');
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

  _initForm() {
    return this.userForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control('', [Validators.required, , Validators.minLength(11)]),
      firstName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      cpf: this.fb.control('', [Validators.required, Validators.minLength(11)]),
    });
  }

  _populateForm() {
    this.userForm.patchValue({
      email: this.user.email,
      phone: this.user.phone,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      cpf: this.user.cpf,
    });
  }

  updateUser(): void {
    this.authService.updateCustomer(this.user.id, new CustomerRequest(this.userForm.value))
      .subscribe(() => this.router.navigate(['/']));
  }
}
