import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {RestaurantService} from 'src/app/services/restaurant.service';
import {RatingService} from 'src/app/services/rating.service';
import {OrderItemRequest} from '../../../models/request/order-item.request';
import {RestaurantResponse} from '../../../models/response/restaurant.response.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit {

  order: any = {};
  reviews: string;
  restaurant: RestaurantResponse;
  isLoading = true;
  itemChosen: OrderItemRequest = {} as OrderItemRequest;
  addOrderItem = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private reviewService: RatingService) {
  }

  ngOnInit() {
    const restaurantId = this.route.snapshot.params.restaurantId;
    this.restaurantService.getRestaurantById(restaurantId)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
        this.isLoading = false;
        this.order.restaurantId = restaurant.id;
        this.reviewService.getRestaurantRatingAverage(restaurantId)
          .subscribe(reviews => {
            this.reviews = (reviews.map(item => item.userRating)
              .reduce((prev, actual) => prev + actual, 0) / reviews.length).toFixed(1);
          });
      });
  }
}
