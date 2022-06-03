import {MenuCategoryResponse} from './menu-category-response.model';

export class MenuResponse {

  id: number;
  categories: MenuCategoryResponse[];

  constructor(model: any = {}) {
    this.id = model.id;
    this.categories = model.categories;
  }
}
