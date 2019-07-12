import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEvaluation} from '../model/Evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private readonly API_URL = 'http://localhost:8080/api/auth/evaluations';
  constructor(private http: HttpClient) { }

  create(evaluation: IEvaluation, houseid: number): Observable<IEvaluation> {
    return this.http.post<IEvaluation>(this.API_URL + '/' + houseid, evaluation);
  }
  getListEvalautions(houseid: number): Observable<IEvaluation[]> {
    return this.http.get<IEvaluation[]>(this.API_URL + '/' + houseid);
  }
}
