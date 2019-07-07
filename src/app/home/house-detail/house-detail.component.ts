import { Component, OnInit } from '@angular/core';
import {IImageToShow} from '../../model/image-to-show';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesHouse} from '../../model/CategoriesHouse';
import {ImageService} from '../../service/image.service';
import {HouseService} from '../../service/house-service.service';
import {CategorieshouseService} from '../../service/categorieshouse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IHouse} from '../../model/House';
import {TokenStorageService} from '../../common/token/token-storage.service';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnInit {

  listImageToShow: IImageToShow[] = [];
  formBooking: FormGroup;
  houseId: number;
  listCurrentImageId = [];
  private house: IHouse;
  authority = false;

  constructor(private tokenStorage: TokenStorageService,
              private imageService: ImageService,
              private houseService: HouseService,
              private cateService: CategorieshouseService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formBooking = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      categories: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      quantityBathroom: ['', [Validators.required, Validators.min(1)]],
      quantityBedroom: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    if (this.tokenStorage.getToken()) {
      this.authority = true;
    }

    const id = +this.route.snapshot.paramMap.get('id');
    this.houseId = id;
    this.imageService.getListIdByHouseId(id).subscribe(next => {
      this.listCurrentImageId = next;
      this.getAllImageFromService();
    });
    this.houseService.getHouse(id).subscribe(data => {
      this.house = data;
      console.log(this.house);
    }, error => {
      console.log('loi' + error);
    });
  }

  createImageFromBlob(image: Blob, idImage: number) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageToShow = {
        id: idImage,
        image: reader.result
      };
      this.listImageToShow.push(imageToShow);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService(id: number) {
    this.imageService.getImage(id).subscribe(data => {
      this.createImageFromBlob(data, id);
    }, error => {
      console.log('aaa' + error);
    });
  }

  getAllImageFromService() {
    for (const idImage of this.listCurrentImageId) {
      this.getImageFromService(idImage);
    }
  }
}
