import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IEvaluation} from '../model/Evaluation';
import {Observable} from 'rxjs';
import {IReply} from '../model/Reply';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private readonly API_URL = 'http://localhost:8080/api/auth/replies';
  constructor(private http: HttpClient) { }

  create(reply: IReply, evaluationId: number): Observable<IReply> {
    return this.http.post<IReply>(this.API_URL + '/' + evaluationId, reply);
  }
  getlistReplies(evaluationId: number): Observable<IReply[]> {
    return this.http.get<IReply[]>(this.API_URL + '/' + evaluationId);
  }
}
