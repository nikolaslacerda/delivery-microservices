import {Component, OnInit} from '@angular/core';
import {ReviewService} from '../../services/review.service';
import {ReviewResponse} from '../../model/review-response.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  isLoading = true;
  hasMoreReviews = true;
  isListLoading = false;
  reviews: ReviewResponse[] = [];
  max = 5;
  isReadonly = true;
  obsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  items$: Observable<any> = this.obsArray.asObservable();
  currentPage = 0;


  constructor(private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  onScroll(): void {
    if (this.hasMoreReviews && !this.isListLoading) {
      console.log('Chamou');
      this.isListLoading = true;
      this.getData();
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  private getData(): void {
    this.reviewService.getReviewsByRestaurant('1', this.currentPage)
      .subscribe((data: any) => {
        this.delay(1000).then(() => {
          this.isLoading = false;
          this.currentPage++;
          const newPost = data;
          this.isListLoading = false;
          if (newPost.length === 0) {
            console.log('Não tem mais ', this.currentPage);
            this.hasMoreReviews = false;
          }
          this.reviews = this.reviews.concat(newPost);
        });
      });
  }
}
