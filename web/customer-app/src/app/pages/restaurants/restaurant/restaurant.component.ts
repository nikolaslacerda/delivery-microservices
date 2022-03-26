import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {RestaurantService} from 'src/app/core/services/restaurant.service';
import {RatingService} from 'src/app/core/services/rating.service';
import {RestaurantResponse} from '../../../shared/models/response/restaurant.response.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  reviews: string;
  isLoading = true;
  restaurant: RestaurantResponse;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private reviewService: RatingService,
              private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    const restaurantId = this.route.snapshot.params.restaurantId;
    this.restaurantService.getRestaurantById(restaurantId)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
        this.isLoading = false;
        this.reviewService.getRestaurantRatingAverage(restaurantId)
          .subscribe(reviews => {
            this.reviews = (reviews.map(item => item.userRating)
              .reduce((prev, actual) => prev + actual, 0) / reviews.length).toFixed(1);
          });
      });
  }
}
