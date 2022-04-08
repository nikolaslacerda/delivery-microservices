export class ReviewResponse {

  id: number;
  userRating: number;
  name: string;
  createdAt: string;
  comment: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.userRating = model.userRating;
    this.name = model.name;
    this.createdAt = model.date;
    this.comment = model.comment;
  }
}
