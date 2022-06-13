import {NgModule} from '@angular/core';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {MenuCategoryComponent} from './menu-category/menu-category.component';
import {AddMenuItemModalComponent} from './menu-item/add-menu-item-modal/add-menu-item-modal.component';
import {EditMenuItemModalComponent} from './menu-item/edit-menu-item-modal/edit-menu-item-modal.component';
import {AddMenuCategoryModalComponent} from './menu-category/add-menu-category-modal/add-menu-category-modal.component';
import {EditMenuCategoryModalComponent} from './menu-category/edit-menu-category-modal/edit-menu-category-modal.component';
import {SharedModule} from '../../shared/shared.module';
import {MenuComponent} from './menu.component';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    MenuComponent,
    MenuItemComponent,
    MenuCategoryComponent,
    AddMenuItemModalComponent,
    EditMenuItemModalComponent,
    AddMenuCategoryModalComponent,
    EditMenuCategoryModalComponent
  ],
  exports: [
    MenuCategoryComponent
  ],
  imports: [
    SharedModule,
    NgxMaskModule
  ]
})
export class MenuModule {
}
