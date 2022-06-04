export class ReviewRequest {

  name: string;
  createdAt: string;
  comment: string;
  userRating: number;
  restaurantId: number;
  orderId: string;

  constructor(model: any = {}) {
    this.name = model.name;
    this.createdAt = model.createdAt;
    this.comment = model.comment;
    this.userRating = model.userRating;
    this.restaurantId = model.restaurantId;
    this.orderId = model.orderId;
  }
}
