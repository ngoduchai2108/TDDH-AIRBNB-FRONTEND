import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../service/booking.service';
import {IBooking} from '../../model/Booking';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.scss']
})
export class ListBookingComponent implements OnInit {
  listbooking: IBooking[];
  msg = false;

  constructor(private  bookingService: BookingService) {
  }

  ngOnInit() {
    this.listBooking();
  }
  listBooking() {
    this.bookingService.getBookings().subscribe(next => this.listbooking = next , err => console.log(err));
  }

  getTotal(startDate, endDate, price) {
      const startDateStamp = new Date(startDate).getTime();
      const endDateStamp = new Date(endDate).getTime();
      const diffDay = (endDateStamp - startDateStamp) / (24 * 3600 * 1000);
      return price * diffDay;
  }
  getTotalAllBooking() {
    let total =  0;
    for (const book of this.listbooking) {
      total += this.getTotal(book.startDate, book.endDate, book.house.price);
    }
    return total;
  }

  onDelete(id: number) {
    const r = confirm('Are U sure delete this book');
    if (r) {
     this.bookingService.cancelBooking(id)
          .subscribe(
            ne => {
              this.msg = false;
              console.log('deleted this book');
              this.listBooking();
            }, err => this.msg = true);
    }
  }
}
