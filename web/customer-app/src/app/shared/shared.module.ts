import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './components/input/input.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingBarComponent} from './components/loading-bar/loading-bar.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ChangeRestaurantModalComponent} from './components/shopping-cart/change-restaurant-modal/change-restaurant-modal.component';

@NgModule({
  declarations: [
    InputComponent,
    NotFoundComponent,
    LoadingBarComponent,
    ShoppingCartComponent,
    ChangeRestaurantModalComponent
  ],
  exports: [
    InputComponent,
    NotFoundComponent,
    LoadingBarComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule {
}
