import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/pt';

import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';

import {LoginComponent} from './pages/login/login.component';
import {HeaderComponent} from './shared/components/header/header.component';

import {OrderModule} from './pages/order/order.module';

import {ErrorHandlingInterceptor} from './core/interceptors/error-handling-interceptor';
import {JwtInterceptor} from './core/interceptors/jwt-interceptor';

import {SharedModule} from './shared/shared.module';
import {SignupComponent} from './pages/signup/signup.component';
import {UserDetailComponent} from './shared/components/header/user-detail/user-detail.component';
import {EditProfileComponent} from './pages/user/edit-profile/edit-profile.component';
import {PagesComponent} from './pages/pages.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {RatingModule} from 'ngx-bootstrap/rating';
import {IConfig, NgxMaskModule} from 'ngx-mask';

registerLocaleData(localeFr, 'pt');

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    UserDetailComponent,
    EditProfileComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    NgxMaskModule.forRoot(),
    OrderModule,
    SharedModule,
    RouterModule,
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
