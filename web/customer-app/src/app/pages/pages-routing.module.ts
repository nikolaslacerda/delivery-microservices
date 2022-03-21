import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';

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
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
