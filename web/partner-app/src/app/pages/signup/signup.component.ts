import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {RestaurantService} from '../../services/restaurant.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  restaurantForm!: FormGroup;
  partnerForm!: FormGroup;

  partner: any;
  restaurant: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigateByUrl('/home');
    }

    this.partnerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        cpf: ['', Validators.required]
      });

    this.restaurantForm = this.fb.group(
      {
        name: ['', Validators.required],
        cnpj: ['', Validators.required],
        mainCategory: ['', Validators.required],
        description: ['', Validators.required],
        cep: ['', Validators.required],
        address: ['', Validators.required],
        deliveryFee: ['', Validators.required],
        minDeliveryTime: ['', Validators.required],
        maxDeliveryTime: ['', Validators.required]
      }
    );
  }

  createPartner(): void {
    this.partner = this.partnerForm.value;
    this.authService.signUp(this.partner)
      .subscribe(id => {
        this.partner.id = id.id;
      });
  }

  createRestaurant(): void {
    this.restaurant = this.restaurantForm.value;
    this.restaurant.partnerId = this.partner.id;
    console.log(this.restaurantForm.value);
    this.restaurantService.createRestaurant(this.restaurantForm.value)
      .subscribe(() => {
        this.router.navigate([`/restaurant-register-success`]);
      });
  }

}
