import {MenuItemResponse} from './menu-item.response';

export class MenuCategoryResponse {
  id: number;
  name: string;
  items: MenuItemResponse[];
}
