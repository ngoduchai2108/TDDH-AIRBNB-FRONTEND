import {Component, OnInit} from '@angular/core';
import {IBooking} from '../../model/Booking';
import {BookingService} from '../../service/booking.service';

@Component({
  selector: 'app-booking-cart',
  templateUrl: './booking-cart.component.html',
  styleUrls: ['./booking-cart.component.scss']
})
export class BookingCartComponent implements OnInit {
  listbooking: IBooking[];
  msg = false;

  constructor(private  bookingService: BookingService) {
  }

  ngOnInit() {
    this.listBooking();
  }

  listBooking() {
    this.bookingService.getBookings().subscribe(next => this.listbooking = next, err => console.log(err));
  }

  getTotal(startDate, endDate, price) {
    const startDateStamp = new Date(startDate).getTime();
    const endDateStamp = new Date(endDate).getTime();
    const diffDay = (endDateStamp - startDateStamp) / (24 * 3600 * 1000);
    return price * diffDay;
  }

  getTotalAllBooking() {
    let total = 0;
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

  putCheckIn(id: number) {
    this.bookingService.putCheckIn(id).subscribe(next => {
      this.listBooking();
    }, error => console.log(error));
  }
}
