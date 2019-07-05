import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../common/token/token-storage.service';
import {HouseService} from '../service/house-service.service';
import {IHouse} from '../model/House';
import {ImageService} from '../service/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info: any;
  listhouse: IHouse[] = [];
  listCurrentImageId = []
  ;
  // private listImageToShow = [];
  isImage = false;
  private listImageToShowOfHouse = [];
  private idImage: number;

  constructor(private tokenStorageService: TokenStorageService,
              private houseService: HouseService,
              private  imageService: ImageService) {
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
    this.houseService.getHousesStatus()
      .subscribe(next => {
        this.listhouse = next;
        this.getAllImageFromService();
      }, err => console.log(err));
  }


  createImageFromBlob(image: Blob, index: number) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.listImageToShowOfHouse[index] = {
        image: reader.result
      };
      console.log('ddddddddddd' + this.listImageToShowOfHouse[index] + index);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService(index: number, idHouse: number) {
    this.imageService.getFirstImage(idHouse).subscribe(data => {
      this.createImageFromBlob(data, index);
    }, error => {
      console.log('aaa' + error);
    });
  }

  getAllImageFromService() {
    for (let i = 0; i < this.listhouse.length; i++) {
      this.getImageFromService(i, this.listhouse[i].id);
      console.log('aawwww' + this.listImageToShowOfHouse);
    }
  }


  logout() {
    this.tokenStorageService.logOut();
    window.location.reload();
  }
}
