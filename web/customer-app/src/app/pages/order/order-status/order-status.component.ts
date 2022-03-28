import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RatingService} from 'src/app/core/services/rating.service';
import {OrderService} from '../../../core/services/order.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {OrderResponse} from '../../../shared/models/response/order.response.model';
import {ReviewResponse} from '../../../shared/models/response/review.response.model';
import {ReviewRequest} from '../../../shared/models/request/review.request.model';

@Component({
  selector: 'app-order-status-order',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  order: OrderResponse = {} as OrderResponse;
  review: ReviewResponse = {} as ReviewResponse;

  ratingForm = this.fb.group({
    rating: ['', Validators.required],
    comment: ['', Validators.required],
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private ratingService: RatingService) {
  }

  ngOnInit() {
    const orderId = this.route.snapshot.params.orderId;
    this.orderService.getOrderById(orderId)
      .subscribe((order: OrderResponse) => {
        this.order = order;
        this.ratingService.getOrderReview(orderId).subscribe((review: ReviewResponse) => {
          this.review = review[0];
        });
      });
  }

  get comment(): AbstractControl {
    return this.ratingForm.get('comment');
  }

  createReview(): void {
    this.review.orderId = this.order.id;
    this.review.restaurantId = this.order.restaurant.id;
    this.review.createdAt = Date.now().toString();
    this.review.name = '';
    this.ratingService.createReview(new ReviewRequest(this.ratingForm))
      .subscribe(review => {
        this.review = review;
        setTimeout(() => this.router.navigate(['']), 1500);
      });
  }

  isLoading() {
    return Object.keys(this.order).length === 0 && Object.keys(this.review).length === 0;
  }
}
