import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {HouseManagementComponent} from './user/house-management/house-management.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'houses',
    component: HouseManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
