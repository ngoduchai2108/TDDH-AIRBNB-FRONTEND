import { Component, OnInit } from '@angular/core';
import {IImageToShow} from '../../model/image-to-show';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IHouse} from '../../model/House';
import {TokenStorageService} from '../../common/token/token-storage.service';
import {ImageService} from '../../service/image.service';
import {HouseService} from '../../service/house-service.service';
import {CategorieshouseService} from '../../service/categorieshouse.service';
import {ActivatedRoute} from '@angular/router';
import {BookingService} from '../../service/booking.service';
import {IBooking} from '../../model/Booking';

@Component({
  selector: 'app-house-view',
  templateUrl: './house-view.component.html',
  styleUrls: ['./house-view.component.scss']
})
export class HouseViewComponent implements OnInit {
  listImageToShow: IImageToShow[] = [];
  formBooking: FormGroup;
  houseId: number;
  listCurrentImageId = [];
  authority = false;
  private house: IHouse;
  listbooking: IBooking[];
  filter: any;
  p: any;

  constructor(private tokenStorage: TokenStorageService,
              private imageService: ImageService,
              private houseService: HouseService,
              private cateService: CategorieshouseService,
              private route: ActivatedRoute,
              private bookingService: BookingService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formBooking = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
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
    this.getBookingByHouse(id);
    this.houseService.getHouse(id).subscribe(data => {
      this.house = data;
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
  getBookingByHouse(id: number) {
    this.bookingService.getBookingByHouse(id).subscribe(
      data => {
        console.log( data);
        this.listbooking = data;
      }, error => {
        console.log('loi: ' + error);
      });
  }
  getTotal(startDate, endDate, price) {
    const startDateStamp = new Date(startDate).getTime();
    const endDateStamp = new Date(endDate).getTime();
    const diffDay = (endDateStamp - startDateStamp) / (24 * 3600 * 1000);
    return price * diffDay;
  }
}
