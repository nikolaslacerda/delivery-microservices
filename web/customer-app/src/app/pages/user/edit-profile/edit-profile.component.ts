import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userForm: FormGroup;
  user: any;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this._initForm();
    this.authService.getUserInfo()
      .subscribe(user => {
        this.user = user;
        this._populateForm();
      });

  }

  get email(): any {
    return this.userForm.get('email');
  }

  get phone(): any {
    return this.userForm.get('phone');
  }

  get firstName(): any {
    return this.userForm.get('firstName');
  }

  get lastName(): any {
    return this.userForm.get('lastName');
  }

  get cpf(): any {
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

  updateUser() {
    this.authService.updateCustomer(this.user.id, this.userForm.value)
      .subscribe(() => this.router.navigate(['/']));
  }
}
