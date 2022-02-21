import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PagesComponent} from './pages/pages.component';
import {MenuComponent} from './pages/menu/menu.component';
import {ScheduleComponent} from './pages/schedule/schedule.component';
import {PaymentMethodsComponent} from './pages/payment-methods/payment-methods.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {OrderDetailComponent} from './pages/orders/order-detail/order-detail.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MenuItemComponent} from './pages/menu/menu-item/menu-item.component';
import {MenuCategoryComponent} from './pages/menu/menu-category/menu-category.component';
import {AddMenuItemModalComponent} from './pages/menu/menu-item/add-menu-item-modal/add-menu-item-modal.component';
import {EditMenuItemModalComponent} from './pages/menu/menu-item/edit-menu-item-modal/edit-menu-item-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {EditMenuCategoryModalComponent} from './pages/menu/menu-category/edit-menu-category-modal/edit-menu-category-modal.component';
import {AddMenuCategoryModalComponent} from './pages/menu/menu-category/add-menu-category-modal/add-menu-category-modal.component';
import {AddScheduleModalComponent} from './pages/schedule/add-schedule-modal/add-schedule-modal.component';
import {EditScheduleModalComponent} from './pages/schedule/edit-schedule-modal/edit-schedule-modal.component';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {RatingModule} from 'ngx-bootstrap/rating';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {JwtInterceptor} from './interceptor/jwt-interceptor';
import {ProfileComponent} from './pages/profile/profile.component';
import {LoadingComponent} from './shared/components/loading/loading.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {PipesModule} from './shared/pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagesComponent,
    OrdersComponent,
    MenuComponent,
    ScheduleComponent,
    PaymentMethodsComponent,
    ReviewsComponent,
    OrderDetailComponent,
    MenuItemComponent,
    MenuCategoryComponent,
    AddMenuItemModalComponent,
    EditMenuItemModalComponent,
    EditMenuCategoryModalComponent,
    AddMenuCategoryModalComponent,
    AddScheduleModalComponent,
    EditScheduleModalComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    RatingModule.forRoot(),
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    InfiniteScrollModule
  ],
  exports: [
    AddMenuItemModalComponent,
    EditMenuItemModalComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
