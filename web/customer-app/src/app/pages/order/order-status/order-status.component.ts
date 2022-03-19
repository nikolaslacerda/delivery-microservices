import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RatingService} from 'src/app/services/rating.service';
import {OrderRequest} from '../../../models/request/order.request.model';
import {OrderService} from '../../../services/order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderResponse} from '../../../models/response/order.response.model';
import {ReviewResponse} from '../../../models/response/review.response.model';
import {ReviewRequest} from '../../../models/request/review.request.model';

@Component({
  selector: 'app-order-status-order',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  ratingForm: FormGroup;
  order: OrderResponse = {} as OrderResponse;
  review: ReviewResponse = {} as ReviewResponse;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private orderService: OrderService,
              private ratingService: RatingService) {
  }

  ngOnInit() {
    this.ratingForm = this.fb.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required],
    });
    const orderId = this.route.snapshot.params.orderId;
    this.orderService.getOrderById(orderId)
      .subscribe((order: OrderResponse) => {
        this.order = order;
        this.ratingService.getOrderReview(orderId).subscribe((review: ReviewResponse) => {
          this.review = review[0];
          console.log(this.review)
        });
      });
  }

  createReview() {
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
