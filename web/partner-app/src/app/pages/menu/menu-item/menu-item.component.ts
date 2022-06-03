import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../../core/services/menu.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddMenuItemModalComponent} from './add-menu-item-modal/add-menu-item-modal.component';
import {EditMenuItemModalComponent} from './edit-menu-item-modal/edit-menu-item-modal.component';
import {MenuItemResponse} from '../../../shared/model/response/menu-item-response.model';
import {ToastrService} from 'ngx-toastr';
import {MenuCategoryResponse} from '../../../shared/model/response/menu-category-response.model';
import {MenuItemRequest} from '../../../shared/model/request/menu-item-request.model';

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
    // this.menuService.getItemsByCategory(this.category.id)
    //   .subscribe((items: MenuItemResponse[]) => this.items = items);
    this.items = this.category.items;
  }

  updateItemStatus(item: MenuItemResponse): void {
    this.menuService.editItem(item.id, new MenuItemRequest({active: !item.active})).subscribe();
  }

  deleteMenuItem(item: MenuItemResponse): void {
    this.menuService.deleteItem(item)
      .subscribe(() => {
        this.items = this.items.filter((items: any) => items !== item);
        this.showSuccessDelete(item.name);
      });
  }

  openAddModal(category: MenuCategoryResponse): void {
    const initialState = {category};
    this.bsModalRef = this.modalService.show(AddMenuItemModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe((item: any) => {
      this.items.push(item);
      this.showSuccessCreate(item.name);
    });
  }

  openEditModal(item: MenuItemResponse): void {
    const initialState = {item};
    this.bsModalRef = this.modalService.show(EditMenuItemModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe((editedItem: MenuItemResponse) => {
      item.name = editedItem.name;
      item.description = editedItem.name;
      item.promotionalPrice = editedItem.promotionalPrice;
      item.price = editedItem.price;
      item.imageUrl = editedItem.imageUrl;
      item.active = editedItem.active;
      // this.category.id = editedItem.menuCategoryId;
      this.showSuccessUpdate();
    });
  }

  showSuccessCreate(itemName: string): void {
    this.toastr.success('Adicionado o item ' + itemName, 'Sucesso', {
      timeOut: 3000,
    });
  }

  showSuccessUpdate(): void {
    this.toastr.success('Categoria atualizada', 'Sucesso', {
      timeOut: 3000,
    });
  }

  showSuccessDelete(itemName: string): void {
    this.toastr.success('Removido o item ' + itemName, 'Sucesso', {
      timeOut: 3000,
    });
  }

}
