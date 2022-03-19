import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ReviewsComponent} from './reviews.component';
import {RatingModule} from 'ngx-bootstrap/rating';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    ReviewsComponent
  ],
  imports: [
    SharedModule,
    InfiniteScrollModule,
    RatingModule.forRoot()
  ]
})
export class ReviewsModule {
}
