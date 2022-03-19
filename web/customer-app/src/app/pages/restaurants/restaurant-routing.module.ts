import {RouterModule, Routes} from '@angular/router';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {RestaurantComponent} from './restaurant/restaurant.component';
import {MenuComponent} from './restaurant/menu/menu.component';
import {ReviewsComponent} from './restaurant/reviews/reviews.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RestaurantListComponent
  },
  {
    path: 'restaurants',
    component: RestaurantListComponent
  },
  {
    path: 'restaurants/:cep/tipos-de-cozinha/:tipoDeCozinhaId',
    component: RestaurantListComponent
  },
  {
    path: ':restaurantId',
    component: RestaurantComponent,
    children: [
      {
        path: '',
        redirectTo: 'menus',
        pathMatch: 'full'
      },
      {
        path: 'menus',
        component: MenuComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {
}
