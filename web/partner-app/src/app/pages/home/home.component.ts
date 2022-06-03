import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../core/services/order.service';
import {ReviewService} from '../../core/services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  orders: any;
  reviews: any;

  constructor(private orderService: OrderService,
              private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.orderService.getRestaurantOrders(1)
      .subscribe(orders => {
        this.orders = orders;
        this.reviewService.getReviewsByRestaurant2(1)
          .subscribe(reviews => {
            this.reviews = reviews;
            this.isLoading = false;
          });
      });
  }

  getMonthyOrders(): any {
    return this.orders.filter((order: any) => new Date(order.createdAt).getMonth() === new Date().getMonth());
  }

  getTodayOrders(): any {
    return this.orders.filter((order: any) => new Date(order.createdAt).getDate() === new Date().getDate());
  }

  getWeekReviews(): any {
    return this.reviews.filter((review: any) => new Date(review.createdAt).getDate() > new Date().getDate() - 7);
  }

  getDayFatur(): any {
    let sum = 0;
    this.getTodayOrders().forEach((order: any) => sum += order.payment.total);
    return sum;
  }

  getMonthFatur(): any {
    let sum = 0;
    this.getMonthyOrders().forEach((order: any) => sum += order.payment.total);
    return sum;
  }

  getMonthReviewsAverage(): any {
    let sum = 0;
    this.getWeekReviews().forEach((order: any) => sum += order.userRating);
    return sum / this.getWeekReviews().length;
  }

}
