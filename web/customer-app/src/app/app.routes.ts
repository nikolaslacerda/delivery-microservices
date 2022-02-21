import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './component/auth/login/login.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {SignupComponent} from './component/auth/signup/signup.component';
import {HomeComponent} from './home/home.component';
import {EditProfileComponent} from './component/edit-profile/edit-profile.component';
import {LoginGuard} from './guards/login.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'user/edit',
    component: EditProfileComponent,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard]
  },
  {path: 'login', component: LoginComponent},
  // {path: 'about', component: AboutComponent},
  {path: 'login/:to', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', component: NotFoundComponent}];

export const appRoutes = RouterModule.forRoot(routes);
