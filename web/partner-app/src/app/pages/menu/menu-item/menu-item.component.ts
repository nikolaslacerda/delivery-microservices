import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../../services/menu.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddMenuItemModalComponent} from './add-menu-item-modal/add-menu-item-modal.component';
import {EditMenuItemModalComponent} from './edit-menu-item-modal/edit-menu-item-modal.component';
import {MenuItemResponse} from '../../../model/menu-item-response.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() category: any;
  items: MenuItemResponse[] = [];
  bsModalRef: BsModalRef | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService,
              public toastr: ToastrService,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuService.getItemsByCategory(this.category.id)
      .subscribe(items => this.items = items);
  }

  updateItemStatus(item: MenuItemResponse): void {
    item.active = !item.active;
    this.menuService.updateItemStatus(item).subscribe();
  }

  deleteMenuItem(item: MenuItemResponse): void {
    this.menuService.deleteMenuItem(item)
      .subscribe(() => {
        this.items = this.items.filter((items: any) => items !== item);
        this.showSuccessDelete(item.name);
      });
  }

  openAddModal(category: any): void {
    const initialState = {
      list: [
        {category}
      ]
    };
    this.bsModalRef = this.modalService.show(AddMenuItemModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe((item: any) => {
      this.items.push(item);
      this.showSuccessCreate(item.name);
    });
  }

  openEditModal(item: any): void {
    const initialState = {
      list: [
        {item}
      ]
    };
    this.bsModalRef = this.modalService.show(EditMenuItemModalComponent, {initialState});
    this.bsModalRef.content.event.subscribe((editedItem: MenuItemResponse) => {
      item.name = editedItem.name;
      item.description = editedItem.name;
      item.unitPrice = editedItem.unitPrice;
      item.unitOriginalPrice = editedItem.unitOriginalPrice;
      item.imageUrl = editedItem.imageUrl;
      item.active = editedItem.active;
      item.menuCategoryId = editedItem.menuCategoryId;
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
