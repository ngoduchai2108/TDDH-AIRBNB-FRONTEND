import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {HouseManagementComponent} from './user/house-management/house-management.component';
import {EditHouseComponent} from './user/edit-house/edit-house.component';
import {HouseDetailComponent} from './home/house-detail/house-detail.component';
import {HouseViewComponent} from './user/house-view/house-view.component';
import {BookingCartComponent} from './home/booking-cart/booking-cart.component';
import {HistoryBookingComponent} from './home/history-booking/history-booking.component';
import {IncomeComponent} from './user/income/income.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'income',
    component: IncomeComponent
  },
  {
    path: 'houses/view/:id',
    component: HouseViewComponent
  },
  {
    path: 'history',
    component: HistoryBookingComponent
  },
  {
    path: 'booking',
    component: BookingCartComponent
  },
  {
    path: 'houses/:id',
    component: HouseDetailComponent
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
    path: 'houses/edit/:id',
    component: EditHouseComponent
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
