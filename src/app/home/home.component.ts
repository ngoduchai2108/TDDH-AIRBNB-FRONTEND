import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../common/token/token-storage.service';
import {HouseService} from '../service/house-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info: any;
  listhouse: any;

  constructor(private tokenStorageService: TokenStorageService,
              private houseService: HouseService) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenStorageService.getToken(),
      email: this.tokenStorageService.getEmail(),
      author: this.tokenStorageService.getAuthor()
    };
    this.updateListHouse();
  }

  updateListHouse() {
    this.houseService.getHouses()
      .subscribe(next => this.listhouse = next, err => console.log(err));
  }

  logout() {
    this.tokenStorageService.logOut();
    window.location.reload();
  }
}
