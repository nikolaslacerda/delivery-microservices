import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RatingService} from 'src/app/services/rating.service';
import {Review} from '../../../models/order/review';
import {OrderRequest} from '../../../models/order/request/order.request.model';
import {OrderService} from '../../../services/order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-order-status-order',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  ratingForm: FormGroup;
  order: OrderRequest = {} as OrderRequest;
  review: Review = {} as Review;

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
      .subscribe(order => {
        this.order = order;
      });
  }

  createReview() {
    this.review.order = this.order;
    this.ratingService.createReview(this.review)
      .subscribe(review => {
        this.review = review;
        setTimeout(() => this.router.navigate(['']), 1500);
      });
  }

  isLoading(order: OrderRequest) {
    return Object.keys(order).length === 0;
  }
}
