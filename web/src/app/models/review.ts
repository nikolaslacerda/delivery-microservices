import {Order} from './order';

export class Review {
  id: number;
  userRating: number;
  name: string;
  date: string;
  comments: string;
  order: Order;
}
