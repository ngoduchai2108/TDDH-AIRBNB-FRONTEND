import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './common/token/token-storage.service';
import {Observable} from 'rxjs';
import {AuthService} from './common/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  info: any;
  isLoggedIn$: Observable<boolean>;


  constructor(private tokenStorage: TokenStorageService,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService
           ) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthor();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    this.isLoggedIn$ =  this.authService.isLoggedIn;;

    this.info = {
      token: this.tokenStorageService.getToken()
    };

  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
