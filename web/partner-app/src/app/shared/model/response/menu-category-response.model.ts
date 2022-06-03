import {MenuItemResponse} from './menu-item-response.model';

export class MenuCategoryResponse {

  id: number;
  items: MenuItemResponse[];
  name: string;
  active: boolean;

  constructor(model: any = {}) {
    this.id = model.id;
    this.items = model.items;
    this.name = model.name;
    this.active = model.active;
  }
}
