import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {RestaurantService} from 'src/app/services/restaurant.service';
import {RatingService} from 'src/app/services/rating.service';
// import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Menu} from '../../../../models/restaurant/menu';
import {OrderRequest} from '../../../../models/order/request/order.request.model';
import {OrderItem} from '../../../../models/order/order-item';
import {Delivery} from '../../../../models/order/delivery';
import {Restaurant} from '../../../../models/restaurant/restaurant';
import {pipe} from 'rxjs';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit {

  order: any = {};
  reviews: string;
  restaurant: Restaurant;

  itemChosen: OrderItem = {} as OrderItem;
  addOrderItem = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private reviewService: RatingService) {
  }

  ngOnInit() {
    const restaurantId = this.route.snapshot.params.restaurantId;

    console.log(restaurantId)

    this.restaurantService.getRestaurantById(restaurantId)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
        this.order.restaurantId = restaurant.id;

        this.reviewService.getRestaurantRatingAverage(restaurantId)
          .subscribe(reviews => {
            this.reviews = (reviews.map(item => item.userRating)
              .reduce((prev, actual) => prev + actual, 0) / reviews.length).toFixed(1);
          });
      });
  }
}
