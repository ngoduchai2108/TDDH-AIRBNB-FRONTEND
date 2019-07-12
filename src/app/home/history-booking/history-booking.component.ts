import { Component, OnInit } from '@angular/core';
import {IBooking} from '../../model/Booking';
import {BookingService} from '../../service/booking.service';

@Component({
  selector: 'app-history-booking',
  templateUrl: './history-booking.component.html',
  styleUrls: ['./history-booking.component.scss']
})
export class HistoryBookingComponent implements OnInit {
  authority = false;
  listbooking: IBooking[];
  filter: any;
  p: any;

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
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
