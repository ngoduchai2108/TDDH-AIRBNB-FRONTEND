import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IIncome} from '../model/Income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private readonly API_URL = 'http://192.168.2.158:8080/api/auth/incomes?month=';

  constructor(private http: HttpClient) {
  }

  getIncomes(month: string, year: string): Observable<IIncome[]> {
    return this.http.get<IIncome[]>(this.API_URL + month + '&year=' + year);
  }
}
