import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'restaurants'
  },
  {
    path: '', component: PagesComponent, children: [
      {
        path: 'restaurants',
        loadChildren: () => import('./restaurants/restaurant.module')
          .then(m => m.RestaurantModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./order/order.module')
          .then(m => m.OrderModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module')
          .then(m => m.UserModule)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
