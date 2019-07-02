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
  form: FormGroup;
  loginForm: FormGroup;
  isLoggedIn = false;
  isLogInFailed = false;
  roles: string[] = [];
  private formSubmitAttempt: boolean;

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
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {value} = this.loginForm;
      this.authService.login(this.form.value);
      // @ts-ignore
      this.authService.attempAuth(value).subscribe(next => {
        // @ts-ignore
        this.tokenStorageService.saveToken(next.token);
        this.tokenStorageService.saveEmail(next.email);
        // @ts-ignore
        this.tokenStorageService.saveAuthor(next.authorities);
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getAuthor();
        this.router.navigate(['/home']);
      }, error => {
        this.isLogInFailed = true;
      });
    } else {this.isLogInFailed = true; }
    this.formSubmitAttempt = true;
  }
}
