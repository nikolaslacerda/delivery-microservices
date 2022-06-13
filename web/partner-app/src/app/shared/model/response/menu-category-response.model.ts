import {MenuItemResponse} from './menu-item-response.model';

export interface MenuCategoryResponse {
  id: number;
  items: MenuItemResponse[];
  name: string;
  active: boolean;
}
