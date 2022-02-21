import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TextMaskModule} from 'angular2-text-mask';

import {PipesModule} from '../../shared/pipes/pipes.module';

import {restauranteRoutes} from './restaurant.routes';

import {RestaurantCardComponent} from './customer/restaurant-list/restaurant-card/restaurant-card.component';
import {RestaurantListComponent} from './customer/restaurant-list/restaurant-list.component';
import {MenuComponent} from './customer/restaurant/menu/menu.component';
import {ReviewsComponent} from './customer/restaurant/reviews/reviews.component';
import {RestaurantComponent} from './customer/restaurant/restaurant.component';
import {MenuItemComponent} from './customer/restaurant/menu/menu-item/menu-item.component';
import {ShoppingCartComponent} from './customer/shopping-cart/shopping-cart.component';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    RestaurantComponent,
    RestaurantListComponent,
    MenuComponent,
    MenuItemComponent,
    ReviewsComponent,
    RestaurantCardComponent
  ],
  exports: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    restauranteRoutes,
    PipesModule,
    NgbAccordionModule,
    SharedModule,
    NgMultiSelectDropDownModule,
  ]
})
export class RestaurantModule {
}
