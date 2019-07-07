import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../common/auth/auth.service';
import {TokenStorageService} from '../common/token/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLogInFailed = false;
  roles: string[] = [];
  authority = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.tokenStorageService.getToken()) {
      this.authority = true;
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {value} = this.loginForm;
      // @ts-ignore
      this.authService.attempAuth(value).subscribe(next => {
        // @ts-ignore
        this.tokenStorageService.saveToken(next.token);
        this.tokenStorageService.saveEmail(next.email);
        // @ts-ignore
        this.tokenStorageService.saveAuthor(next.authorities);
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getAuthor();
        // @ts-ignore
        window.location.href = 'http://localhost:4200/home';
      }, error => {
        this.isLogInFailed = true;
      });
    } else {this.isLogInFailed = true; }
  }

  logOut() {
    this.tokenStorageService.logOut();
    this.authority = false;
  }
}
