export class MenuCategoryRequest {

  menuId: number;
  name: string;
  active: boolean;

  constructor(model: any = {}) {
    this.menuId = model.menuId;
    this.name = model.name;
    this.active = true;
  }
}
