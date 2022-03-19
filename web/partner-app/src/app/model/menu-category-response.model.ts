export class MenuCategoryResponse {

  id: number;
  menuId: number;
  name: string;
  active: boolean;

  constructor(model: any = {}) {
    this.id = model.id;
    this.menuId = model.menuId;
    this.name = model.name;
    this.active = model.active;
  }
}
