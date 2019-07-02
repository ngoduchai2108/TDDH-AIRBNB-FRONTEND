import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from '../jwt/jwt-response';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
// @ts-ignore
import { LoginInfo } from './email';

const HTTP_OPTIONS = {
  header: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private readonly LOGIN_URL = 'http://192.168.2.158:8080/api/auth/signin';
  private readonly SIGNUP_URL = 'http://192.168.2.158:8080/api/auth/signup';

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private http: HttpClient,
              private router: Router) {
  }

  attempAuth(credentials: any): Observable<JwtResponse> {
    // @ts-ignore
    return this.http.post<JwtResponse>(this.LOGIN_URL, credentials, HTTP_OPTIONS);
  }

  signUp(info: any): Observable<string> {
    // @ts-ignore
    return this.http.post<string>(this.SIGNUP_URL, info, HTTP_OPTIONS);
  }
  login(email: LoginInfo) {
    if (email.email !== '' && email.password !== '') {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
