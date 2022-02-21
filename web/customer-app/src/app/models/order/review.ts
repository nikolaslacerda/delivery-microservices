import {OrderRequest} from './request/order.request.model';

export class Review {
  id: number;
  userRating: number;
  name: string;
  date: string;
  comments: string;
  order: OrderRequest;
}
