import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from '../../../core/services/menu.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddMenuCategoryModalComponent} from './add-menu-category-modal/add-menu-category-modal.component';
import {EditMenuCategoryModalComponent} from './edit-menu-category-modal/edit-menu-category-modal.component';
import {ToastrService} from 'ngx-toastr';
import {MenuCategoryResponse} from '../../../shared/model/response/menu-category-response.model';
import {MenuResponse} from '../../../shared/model/response/menu-response.model';
import {MenuCategoryRequest} from '../../../shared/model/request/menu-category-request.model';

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
    // this.menuService.getCategoriesByMenu(this.menu.id)
    //   .subscribe((categories: MenuCategoryResponse[]) => {
    //     this.categories = categories;
    //   });
    this.categories = this.menu.categories;
    console.log(this.categories);
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
    console.log(category);
    this.menuService.editCategory(1, 1, category.id, new MenuCategoryRequest({active: !category.active}))
      .subscribe(() => category.active = !category.active);
  }

  deleteMenuCategory(category: any): void {
    this.menuService.deleteCategory(1, 1, category.id)
      .subscribe(() => {
        this.categories = this.categories.filter((categories: any) => categories !== category);
        this.showSuccessDelete(category.name);
      });
  }

  showSuccessCreate(categoryName: string): void {
    this.toastr.success('Category ' + categoryName + ' successfully created', 'Success', {
      timeOut: 3000,
    });
  }

  showSuccessUpdate(): void {
    this.toastr.success('Category successfully updated', 'Success', {
      timeOut: 3000,
    });
  }

  showSuccessDelete(categoryName: string): void {
    this.toastr.success('Category deleted successfully' + categoryName, 'Success', {
      timeOut: 3000,
    });
  }
}
