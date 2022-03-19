import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TextMaskModule} from 'angular2-text-mask';

import {PipesModule} from '../../shared/pipes/pipes.module';

import {RestaurantRoutingModule} from './restaurant-routing.module';

import {RestaurantCardComponent} from './restaurant-list/restaurant-card/restaurant-card.component';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {MenuComponent} from './restaurant/menu/menu.component';
import {ReviewsComponent} from './restaurant/reviews/reviews.component';
import {RestaurantComponent} from './restaurant/restaurant.component';
import {MenuItemComponent} from './restaurant/menu/menu-item/menu-item.component';
import {SharedModule} from '../../shared/shared.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    RestaurantComponent,
    RestaurantListComponent,
    MenuComponent,
    MenuItemComponent,
    ReviewsComponent,
    RestaurantCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    RestaurantRoutingModule,
    PipesModule,
    SharedModule,
    NgMultiSelectDropDownModule,
  ]
})
export class RestaurantModule {
}
