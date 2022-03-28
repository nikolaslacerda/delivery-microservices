import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CuisineTypeService} from 'src/app/core/services/cuisine-type.service';
import {RestaurantService} from 'src/app/core/services/restaurant.service';
import {FormBuilder, Validators} from '@angular/forms';
import {RestaurantResponse} from '../../../shared/models/response/restaurant.response.model';
import {CuisineTypeResponse} from '../../../shared/models/response/cuisine-type.response';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  q: string;
  isLoading = true;
  mainCategory: string;
  cuisineTypes: CuisineTypeResponse[] = [];
  allRestaurants: RestaurantResponse[] = [];

  searchForm = this.fb.group({
    restaurantName: ['', Validators.required]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private restaurantService: RestaurantService,
              private cuisineTypeService: CuisineTypeService) {
  }

  ngOnInit() {
    this.cuisineTypeService.getCuisineTypes().subscribe(cuisineTypes => {
      this.cuisineTypes = cuisineTypes;
    });
    this.route.queryParams.subscribe(queryParams => {
      this.mainCategory = queryParams.mainCategory;
      this.getFeedRestaurants();
    });
    this.route.queryParams.subscribe(queryParams => {
      this.q = queryParams.q;
      this.getFeedRestaurants();
    });
  }

  getFeedRestaurants() {
    if (this.q) {
      this.restaurantService.getRestaurants(this.q).subscribe(restaurants => {
        this.allRestaurants = restaurants;
        this.isLoading = false;
      });
    } else if (this.mainCategory) {
      this.restaurantService.getRestaurantsByCategory(this.mainCategory).subscribe(restaurants => {
        this.allRestaurants = restaurants;
        this.isLoading = false;
      });
    } else {
      this.restaurantService.getRestaurants().subscribe(restaurants => {
        this.allRestaurants = restaurants;
        this.isLoading = false;
      });
    }
  }
}
