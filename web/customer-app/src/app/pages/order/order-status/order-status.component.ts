import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RatingService} from 'src/app/core/services/rating.service';
import {OrderService} from '../../../core/services/order.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {OrderResponse} from '../../../shared/models/response/order.response.model';
import {ReviewResponse} from '../../../shared/models/response/review.response.model';
import {ReviewRequest} from '../../../shared/models/request/review.request.model';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';

@Component({
  selector: 'app-order-status-order',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  isSending = false;
  rate = 0;
  order = {} as OrderResponse;
  review = {} as ReviewResponse;

  ratingForm = this.fb.group({
    rating: ['', Validators.required],
    comment: ['', [Validators.required]]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private ratingService: RatingService,
              private rxStompService: RxStompService) {
  }

  ngOnInit() {
    const orderId = this.route.snapshot.params.orderId;
    this.orderService.getOrderById(orderId)
      .subscribe((order: OrderResponse) => {
        this.order = order;
        this.ratingService.getOrderReview(order.restaurant.id, orderId)
          .subscribe((review: ReviewResponse) => {
            this.review = review[0];
          });
      });

    this.rxStompService.watch(`/orders/${orderId}/status`)
      .subscribe((message: Message) => {
        const order = JSON.parse(message.body);
        this.order.lastStatus = order.lastStatus;
      });

  }

  get comment(): AbstractControl {
    return this.ratingForm.get('comment');
  }

  createReview(): void {
    this.isSending = true;
    const review = new ReviewRequest();
    review.orderId = this.order.id;
    review.restaurantId = this.order.restaurant.id;
    review.createdAt = Date.now().toString();
    review.name = '<username>';
    review.userRating = this.ratingForm.get('rating').value;
    review.comment = this.ratingForm.get('comment').value;
    this.ratingService.createReview(review)
      .subscribe(createReview => {
        this.review = createReview;
        this.isSending = false;
      });
  }

  isLoading(): boolean {
    return Object.keys(this.order).length === 0 && Object.keys(this.review).length === 0;
  }

}
