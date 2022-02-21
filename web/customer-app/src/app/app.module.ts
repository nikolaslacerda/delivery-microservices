import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/pt';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';

import {LoginComponent} from './component/auth/login/login.component';
import {HeaderComponent} from './component/header/header.component';

import {AdminModule} from './component/restaurants/admin/admin.module';
import {OrderModule} from './component/order/order.module';
import {RestaurantModule} from './component/restaurants/restaurant.module';

import {ErrorHandlingInterceptor} from './interceptors/error-handling-interceptor';
import {JwtInterceptor} from './interceptors/jwt-interceptor';

import {appRoutes} from './app.routes';
import {HomeComponent} from './home/home.component';
import {SharedModule} from './shared/shared.module';
import { SignupComponent } from './component/auth/signup/signup.component';
import { UserDetailComponent } from './component/header/user-detail/user-detail.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';

registerLocaleData(localeFr, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    UserDetailComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    appRoutes,
    NgbModule,
    ToastrModule.forRoot(),
    AdminModule,
    RestaurantModule,
    OrderModule,
    SharedModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-br'},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
