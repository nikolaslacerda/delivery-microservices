import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../../core/services/menu.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddMenuItemModalComponent} from './add-menu-item-modal/add-menu-item-modal.component';
import {EditMenuItemModalComponent} from './edit-menu-item-modal/edit-menu-item-modal.component';
import {MenuItemResponse} from '../../../shared/model/response/menu-item-response.model';
import {ToastrService} from 'ngx-toastr';
import {MenuCategoryResponse} from '../../../shared/model/response/menu-category-response.model';
import {MenuItemUpdateRequest} from '../../../shared/model/request/menu-item-update-request.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() category = {} as MenuCategoryResponse;
  items: MenuItemResponse[] = [];
  bsModalRef: BsModalRef | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService,
              public toastr: ToastrService,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.items = this.category.items;
    this.items.forEach(item => item.imageUrl = 'http://localhost:9999/restaurants/1/items/' + item.id + '/image');
  }

  updateItemStatus(item: MenuItemResponse): void {
    this.menuService.editItem(1, 1, item.id, new MenuItemUpdateRequest({active: !item.active}))
      .subscribe(() => {
        item.active = !item.active;
        if (this.category.items.filter((x: MenuItemResponse) => x.active).length === 0) {
          if (!item.active) {
            this.category.active = !this.category.active;
          }
        }
      });
  }

  deleteMenuItem(item: MenuItemResponse): void {
    this.menuService.deleteItem(1, this.category.id, item.id)
      .subscribe(() => {
        this.items = this.items.filter((items: any) => items !== item);
        this.category.items = this.items;
        if (!this.items.length) {
          this.category.active = false;
        }
        this.showSuccessDelete(item.name);
      });
  }

  openAddModal(category: MenuCategoryResponse): void {
    const initialState = {category};
    this.bsModalRef = this.modalService.show(AddMenuItemModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe((item: MenuItemResponse) => {
      item.imageUrl = 'http://localhost:9999/restaurants/1/items/' + item.id + '/image';
      this.items.push(item);
      this.showSuccessCreate(item.name);
    });
  }

  openEditModal(item: MenuItemResponse): void {
    const initialState = {item};
    this.bsModalRef = this.modalService.show(EditMenuItemModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe((editedItem: MenuItemResponse) => {
      item.name = editedItem.name;
      item.description = editedItem.description;
      item.promotionalPrice = editedItem.promotionalPrice;
      item.price = editedItem.price;
      if (editedItem.newImage) {
        item.imageUrl = editedItem.newImage;
      }
      item.active = editedItem.active;
      this.showSuccessUpdate(item.name);
    });
  }

  showSuccessCreate(itemName: string): void {
    this.toastr.success('Menu Item ' + itemName + ' Created Successfully', 'Success', {
      timeOut: 3000,
    });
  }

  showSuccessUpdate(itemName: string): void {
    this.toastr.success('Menu Item ' + itemName + ' Updated Successfully', 'Success', {
      timeOut: 3000,
    });
  }

  showSuccessDelete(itemName: string): void {
    this.toastr.success('Menu Item ' + itemName + ' Deleted Successfully!', 'Success', {
      timeOut: 3000,
    });
  }
}
