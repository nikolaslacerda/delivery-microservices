import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestaurantService} from '../../services/restaurant.service';
import {CategoryService} from '../../services/category.service';
import {AuthService} from '../../services/auth.service';
import {RestaurantImageUpdateRequest} from '../../model/restaurant-image-update-request.model';
import {RestaurantUpdateRequest} from '../../model/restaurant-update-request.model';
import {RestaurantResponse} from '../../model/restaurant-response.model';
import {CuisineTypeResponse} from '../../model/cuisine-type-response.model';

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
  imageSrc: any;

  restaurant = {} as RestaurantResponse;
  cuisineTypes: CuisineTypeResponse[] = [];

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
      .subscribe((restaurant: RestaurantResponse) => {
        this.restaurant = restaurant;
        this.imageSrc = 'https://localhost:3001/partner/profile/image/' + this.restaurant.imageUrl;
        this.categoryService.getCuisineTypes()
          .subscribe((cuisineTypes: CuisineTypeResponse[]) => {
            this.cuisineTypes = cuisineTypes;
            this.populateForm();
            this.isLoading = false;
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
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file2: File = event.target.files[0];
      this.image = file2;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.image = file;
      };
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
        this.restaurantService.updateRestaurantProfileImage(this.restaurant.id, this.image)
          .subscribe(res => {
            const restaurantImageUpdateRequest = new RestaurantImageUpdateRequest(this.restaurantForm.value);
            restaurantImageUpdateRequest.imageUrl = res.uploadedFile.filename;
            this.imageSrc = 'https://localhost:3001/partner/profile/image/' + this.restaurant.imageUrl;
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
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then();
  }
}
