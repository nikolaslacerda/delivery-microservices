import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AvaliacoesService} from '../../../services/avaliacoes.service';
import {ActivatedRoute} from '@angular/router';
import {Review} from '../../../models/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: []
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<Review[]>;

  constructor(private reviewService: AvaliacoesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const restaurantId = this.route.parent.snapshot.params.restaurantId;
    this.reviews = this.reviewService.getByRestaurant(restaurantId);
  }

}
