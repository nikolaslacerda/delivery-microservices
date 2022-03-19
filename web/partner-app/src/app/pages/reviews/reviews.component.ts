import {Component, OnInit} from '@angular/core';
import {ReviewService} from '../../services/review.service';
import {ReviewResponse} from '../../model/review-response.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  restaurantId: any;
  isLoading = true;
  hasMoreReviews = true;
  isListLoading = false;
  reviews: ReviewResponse[] = [];
  max = 5;
  isReadonly = true;
  currentPage = 0;

  constructor(private authService: AuthService,
              private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.restaurantId = this.authService.getRestaurantId();
    this.getReviews();
  }

  onScroll(): void {
    if (this.hasMoreReviews && !this.isListLoading) {
      this.isListLoading = true;
      this.getReviews();
    }
  }

  private getReviews(): void {
    this.reviewService.getReviewsByRestaurant(this.restaurantId, this.currentPage)
      .subscribe((data: ReviewResponse[]) => {
        this.isLoading = false;
        this.currentPage++;
        const reviews = data;
        this.isListLoading = false;
        if (!reviews.length) {
          this.hasMoreReviews = false;
        }
        this.reviews = this.reviews.concat(reviews);
      });
  }
}
