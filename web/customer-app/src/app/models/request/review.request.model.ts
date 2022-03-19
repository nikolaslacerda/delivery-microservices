import {OrderRequest} from './order.request.model';

export class ReviewRequest {

  name: string;
  date: string;
  comments: string;
  userRating: number;
  restaurantId: number;
  order: OrderRequest;

  constructor(model: any = {}) {
    this.name = model.name;
    this.date = model.date;
    this.comments = model.comments;
    this.userRating = model.userRating;
    this.restaurantId = model.restaurantId;
    this.order = model.order;
  }
}
