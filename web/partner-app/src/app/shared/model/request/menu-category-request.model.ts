export class MenuCategoryRequest {

  name?: string;
  active?: boolean;

  constructor(model: any = {}) {
    this.name = model.name;
    this.active = model.active;
  }
}
