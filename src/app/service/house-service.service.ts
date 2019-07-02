import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private readonly API_URL = 'http://192.168.2.158:8080/api/auth/';

  constructor(private http: HttpClient) {
  }

  getHouses(): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(this.API_URL + 'houses');
  }
  getListHouseByUser(): Observable<any> {
    return this.http.get<any>( this.API_URL + 'house');
  }

  remove(id: number): Observable<any> {
    return this.http.delete<number>(this.API_URL + 'house/' + id);
  }

  update(house: any): Observable<any> {
    return this.http.put<any>(this.API_URL + 'house/' + house.id, house);
  }

  create(house: any): Observable<any> {
    return this.http.post<any>(this.API_URL + 'house', house);
  }

  getHouse(id: number) {
    return this.http.get<any>(this.API_URL + 'house/'+ id);
  }
}
