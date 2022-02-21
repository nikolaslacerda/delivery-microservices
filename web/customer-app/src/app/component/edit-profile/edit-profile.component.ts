import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormGroup} from '@angular/forms';
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

  _initForm() {
    return this.userForm = this.fb.group({
      email: this.fb.control(''),
      phone: this.fb.control(''),
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      cpf: this.fb.control(''),
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
