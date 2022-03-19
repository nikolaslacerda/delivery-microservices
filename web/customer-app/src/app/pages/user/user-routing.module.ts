import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {LoginGuard} from '../../guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'edit'
  },
  {
    path: 'edit',
    component: EditProfileComponent,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
