import {MenuCategoryResponse} from './menu-category.response';

export class MenuResponse {
  id: number;
  restaurantId: number;
  categories: MenuCategoryResponse[];
}
