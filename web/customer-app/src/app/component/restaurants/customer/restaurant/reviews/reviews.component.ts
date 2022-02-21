import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RatingService} from '../../../../../services/rating.service';
import {ActivatedRoute} from '@angular/router';
import {Review} from '../../../../../models/order/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: []
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<Review[]>;

  constructor(private reviewService: RatingService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const restaurantId = this.route.parent.snapshot.params.restaurantId;
    this.reviews = this.reviewService.getReviewsByRestaurant(restaurantId);
  }

}
