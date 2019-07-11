import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from './common/auth/auth-interceptor';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import { HouseManagementComponent } from './user/house-management/house-management.component';
import { CreateListCategoriesHouseComponent } from './admin/create-list-categories-house/create-list-categories-house.component';
import { EditHouseComponent } from './user/edit-house/edit-house.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { HouseDetailComponent } from './home/house-detail/house-detail.component';
import { HouseViewComponent } from './user/house-view/house-view.component';
import { HistoryBookingComponent } from './home/history-booking/history-booking.component';
import { BookingCartComponent } from './home/booking-cart/booking-cart.component';
import { EvaluationComponent } from './home/house-detail/evaluation/evaluation.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    HouseManagementComponent,
    CreateListCategoriesHouseComponent,
    EditHouseComponent,
    HouseDetailComponent,
    HouseViewComponent,
    HistoryBookingComponent,
    BookingCartComponent,
    EvaluationComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
