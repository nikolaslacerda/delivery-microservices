export class MenuCategoryResponse {

  id: number;
  menuId: number;
  name: string;
  active: boolean;

  constructor(id: number, menuId: number, name: string, active: boolean) {
    this.id = id;
    this.menuId = menuId;
    this.name = name;
    this.active = active;
  }
}
