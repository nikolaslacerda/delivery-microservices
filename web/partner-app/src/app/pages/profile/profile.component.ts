import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestaurantService} from '../../services/restaurant.service';
import {CategoryService} from '../../services/category.service';
import {AuthService} from '../../services/auth.service';
import {getImagePath} from '../../shared/utils/image.utils';
import {RestaurantImageUpdateRequest} from '../../model/restaurant-image-update-request.model';
import {RestaurantUpdateRequest} from '../../model/restaurant-update-request.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  restaurantForm!: FormGroup;
  isLoading = true;
  buttonLoading = false;
  image!: File;

  restaurant: any;
  cuisineTypes: any;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private categoryService: CategoryService,
              private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.restaurantForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      mainCategory: this.fb.control('', [Validators.required]),
      description: this.fb.control('', Validators.required),
      image: this.fb.group({
        profileImage: this.fb.control('')
      })
    });
    this.authService.getRestaurantInfo()
      .subscribe(restaurant => {
        this.restaurant = restaurant;
        this.categoryService.getCuisineTypes()
          .subscribe(cuisineTypes => {
            this.delay(1000).then(() => {
              this.cuisineTypes = cuisineTypes;
              this.populateForm();
              this.isLoading = false;
            });
          });
      });
  }

  populateForm(): void {
    this.restaurantForm.patchValue({
      name: this.restaurant.name,
      mainCategory: this.restaurant.mainCategory,
      description: this.restaurant.description,
    });
  }

  onImageChange(event: any): void {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.image = file;
    }
  }

  updateRestaurant(): void {
    if (this.restaurantForm.valid) {
      this.buttonLoading = true;
      if (!this.restaurantForm.value.image.profileImage.length) {
        this.restaurantService.updateRestaurant(this.restaurant.id, new RestaurantUpdateRequest(this.restaurantForm.value))
          .subscribe(() => {
            this.buttonLoading = false;
            this.router.navigate(['/']);
          });
      } else {
        const filename = getImagePath(this.restaurant.id, this.image);
        this.restaurantService.updateRestaurantProfileImage(this.restaurant.id, this.image)
          .subscribe(res => {
            const restaurantImageUpdateRequest = new RestaurantImageUpdateRequest(this.restaurantForm.value);
            restaurantImageUpdateRequest.imageUrl = 'assets/img/restaurants/' + res.uploadedFile.filename;
            this.restaurantService.updateRestaurant(this.restaurant.id, restaurantImageUpdateRequest)
              .subscribe(() => {
                this.buttonLoading = false;
                this.router.navigate(['/']);
              });
          });
      }
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }
}
