import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RatingService} from '../../../../services/rating.service';
import {ActivatedRoute} from '@angular/router';
import {ReviewResponse} from '../../../../models/response/review.response.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: []
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<ReviewResponse[]>;

  constructor(private reviewService: RatingService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const restaurantId = this.route.parent.snapshot.params.restaurantId;
    this.reviews = this.reviewService.getReviewsByRestaurant(restaurantId);
  }

}
