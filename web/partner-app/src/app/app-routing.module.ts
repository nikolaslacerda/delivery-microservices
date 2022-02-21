import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages/pages.component';
import {HomeComponent} from './pages/home/home.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {MenuComponent} from './pages/menu/menu.component';
import {ScheduleComponent} from './pages/schedule/schedule.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {PaymentMethodsComponent} from './pages/payment-methods/payment-methods.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileComponent} from './pages/profile/profile.component';
import {SignupComponent} from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'home', canActivate: [AuthGuard]},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
      {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
      {path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard]},
      {path: 'payment-methods', component: PaymentMethodsComponent, canActivate: [AuthGuard]},
      {path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
