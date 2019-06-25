import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoriesHouse} from '../model/CategoriesHouse';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieshouseService {
  private readonly API_CATE_URL = '';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<CategoriesHouse[]> {
    // @ts-ignore
    return this.http.get<CategoriesHouse[]>(this.API_CATE_URL);
  }

  remove(id: number): Observable<any> {
    // @ts-ignore
    return this.http.delete<number>(this.API_CATE_URL, id);
  }
}
