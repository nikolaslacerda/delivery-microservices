import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {PagesComponent} from './pages/pages.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {SignupComponent} from './pages/signup/signup.component';
import {JwtInterceptor} from './core/interceptors/jwt-interceptor';
import {ProfileComponent} from './pages/profile/profile.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {MenuModule} from './pages/menu/menu.module';
import {SharedModule} from './shared/shared.module';
import {OrdersModule} from './pages/orders/orders.module';
import {LoginModule} from './pages/login/login.module';
import {ScheduleModule} from './pages/schedule/schedule.module';
import {ReviewsModule} from './pages/reviews/reviews.module';
import {PaymentMethodsModule} from './pages/payment-methods/payment-methods.module';
import {ErrorHandlingInterceptor} from './core/interceptors/error-handling-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagesComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    MenuModule,
    OrdersModule,
    LoginModule,
    ScheduleModule,
    ReviewsModule,
    PaymentMethodsModule
  ],
  exports: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
