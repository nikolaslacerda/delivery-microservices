import {OrderRequest} from '../request/order.request.model';

export class ReviewResponse {

  id: number;
  name: string;
  createdAt: string;
  comments: string;
  userRating: number;
  restaurantId: number;
  order: OrderRequest;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.createdAt = model.createdAt;
    this.comments = model.comments;
    this.userRating = model.userRating;
    this.restaurantId = model.restaurantId;
    this.order = model.order;
  }
}
