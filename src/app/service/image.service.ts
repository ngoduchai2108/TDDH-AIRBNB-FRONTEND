import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly API_URL =  'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  // getImages(): Observable<any> {
  //   // @ts-ignore
  //   return this.http.get<any>(this.API_URL + 'houses');
  // }
  // getImage(): Observable<any> {
  //   return this.http.get<any>( this.API_URL + 'house');
  // }
  //
  remove(id: number): Observable<any> {
    return this.http.delete<number>(this.API_URL + '/house/' + id);
  }
  removeAllByHouseID(id: number): Observable<any> {
    return this.http.delete<number>(this.API_URL + '/delete-all-files/' + id);
  }
  //
  // update(house: any): Observable<any> {
  //   return this.http.put<any>(this.API_URL + 'house/' + house.id, house);
  // }

  create(houseid: any, img: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/upload-file/' + houseid, img);
  }
}



