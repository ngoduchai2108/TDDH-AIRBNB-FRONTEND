import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IBooking} from '../../model/Booking';
import {TokenStorageService} from '../../common/token/token-storage.service';
import {BookingService} from '../../service/booking.service';

@Component({
  selector: 'app-history-booking',
  templateUrl: './history-booking.component.html',
  styleUrls: ['./history-booking.component.scss']
})
export class HistoryBookingComponent implements OnInit {
  formBooking: FormGroup;
  authority = false;
  listbooking: IBooking[];
  filter: any;
  p: any;

  constructor(private tokenStorage: TokenStorageService,
              private bookingService: BookingService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formBooking = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });

    if (this.tokenStorage.getToken()) {
      this.authority = true;
    }
    this.getBookingByUser();
  }

  getBookingByUser() {
    this.bookingService.getBookingByUser().subscribe(
      data => {
        console.log( data);
        this.listbooking = data;
      }, error => {
        console.log('loi: ' + error);
      });
  }
  getTotal(startDate, endDate, price) {
    const startDateStamp = new Date(startDate).getTime();
    const endDateStamp = new Date(endDate).getTime();
    const diffDay = (endDateStamp - startDateStamp) / (24 * 3600 * 1000);
    return price * diffDay;
  }
}
