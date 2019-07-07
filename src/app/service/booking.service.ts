import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBooking} from '../model/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_URL = 'http://localhost:8080/api/auth/bookings';

  constructor(private http: HttpClient) {
  }

  getBookings(): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(this.API_URL);
  }
  getBooking(id: number): Observable<IBooking> {
    return this.http.get<IBooking>(this.API_URL + '/' + id );
  }

  cancelBooking(id: number): Observable<number> {
    return this.http.delete<number>(this.API_URL + '/' + id);
  }
  houseOwnerDeletebooking(id: number): Observable<number> {
    return this.http.delete<number>(this.API_URL + '/owners/' + id );
  }

  create(booking: IBooking, houseid: number): Observable<IBooking> {
    return this.http.post<IBooking>(this.API_URL + '/' + houseid, booking);
  }
}
