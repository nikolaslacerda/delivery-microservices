import {RouterModule, Routes} from '@angular/router';

import {RestaurantListComponent} from './customer/restaurant-list/restaurant-list.component';
import {RestaurantComponent} from './customer/restaurant/restaurant.component';
import {MenuComponent} from './customer/restaurant/menu/menu.component';
import {ReviewsComponent} from './customer/restaurant/reviews/reviews.component';

const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantListComponent
  },
  {
    path: 'restaurants/:cep/tipos-de-cozinha/:tipoDeCozinhaId',
    component: RestaurantListComponent
  },
  {
    path: 'restaurant/:restaurantId',
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

export const restauranteRoutes = RouterModule.forChild(routes);

