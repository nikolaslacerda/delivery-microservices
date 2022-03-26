export class ReviewRequest {

  name: string;
  createdAt: string;
  comments: string;
  userRating: number;
  restaurantId: number;
  orderId: number;

  constructor(model: any = {}) {
    this.name = model.name;
    this.createdAt = model.createdAt;
    this.comments = model.comments;
    this.userRating = model.userRating;
    this.restaurantId = model.restaurantId;
    this.orderId = model.orderId;
  }
}
