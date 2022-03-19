import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from '../../../services/menu.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddMenuCategoryModalComponent} from './add-menu-category-modal/add-menu-category-modal.component';
import {EditMenuCategoryModalComponent} from './edit-menu-category-modal/edit-menu-category-modal.component';
import {ToastrService} from 'ngx-toastr';
import {MenuCategoryResponse} from '../../../model/menu-category-response.model';
import {MenuResponse} from '../../../model/menu-response.model';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {

  bsModalRef: BsModalRef | undefined;
  @Input() menu = {} as MenuResponse;
  categories: MenuCategoryResponse[] = [];

  constructor(private modalService: BsModalService,
              private menuService: MenuService,
              public toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.menuService.getCategoriesByMenu(this.menu.id)
      .subscribe((categories: MenuCategoryResponse[]) => {
        this.categories = categories;
      });
  }

  openAddModal(): void {
    const initialState = {
      list: [
        {menu: this.menu}
      ]
    };
    this.bsModalRef = this.modalService.show(AddMenuCategoryModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe((category: any) => {
      this.categories.push(category);
      this.showSuccessCreate(category.name);
    });
  }

  openEditModal(category: any): void {
    const initialState = {
      list: [
        {category}
      ]
    };
    this.bsModalRef = this.modalService.show(EditMenuCategoryModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe(() => {
      this.showSuccessUpdate();
    });
  }

  updateCategoryStatus(category: any): void {
    category.active = !category.active;
    this.menuService.updateCategoryStatus(category)
      .subscribe();
  }

  deleteMenuCategory(category: any): void {
    this.menuService.deleteMenuCategory(category)
      .subscribe(() => {
        this.categories = this.categories.filter((categories: any) => categories !== category);
        this.showSuccessDelete(category.name);
      });
  }

  showSuccessCreate(categoryName: string): void {
    this.toastr.success('Adicionada a categoria ' + categoryName, 'Sucesso', {
      timeOut: 3000,
    });
  }

  showSuccessUpdate(): void {
    this.toastr.success('Categoria atualizada', 'Sucesso', {
      timeOut: 3000,
    });
  }

  showSuccessDelete(categoryName: string): void {
    this.toastr.success('Removido a categoria ' + categoryName, 'Sucesso', {
      timeOut: 3000,
    });
  }
}
