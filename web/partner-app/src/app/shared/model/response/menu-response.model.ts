import {MenuCategoryResponse} from './menu-category-response.model';

export interface MenuResponse {
  id: number;
  categories: MenuCategoryResponse[];
}
