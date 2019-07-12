import {Component, OnInit} from '@angular/core';
import {IImageToShow} from '../../model/image-to-show';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageService} from '../../service/image.service';
import {HouseService} from '../../service/house-service.service';
import {CategorieshouseService} from '../../service/categorieshouse.service';
import {ActivatedRoute} from '@angular/router';
import {IHouse} from '../../model/House';
import {TokenStorageService} from '../../common/token/token-storage.service';
import {BookingService} from '../../service/booking.service';

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
  authority = false;
  booked = false;
  total: number;
  errorMessage: string;
  invalidMessage: string;
  private house: IHouse;

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

  validateStartDate(startDateStr: string): boolean {
    const startDateTime = new Date(startDateStr);
    const startDateStamp = startDateTime.getTime();
    const nowStamp = new Date().getTime();
    return ((startDateStamp - nowStamp) > 0) && ((startDateStamp - nowStamp) < 10 * 24 * 3600 * 1000);
  }
  validCheckIn() {
    return this.validateStartDate(this.swapFormBooking().startDate);
  }

  validateEndDate(data: any): boolean {
    const endDateStamp = new Date(data.endDate).getTime();
    const startDateStamp = new Date(data.startDate).getTime();
    return startDateStamp < endDateStamp;
  }

  swapFormBooking() {
    const {value} = this.formBooking;
    const data = {
      startDate: value.startDate + ' 12:00:00',
      endDate: value.endDate + ' 12:00:00'
    };
    return data;
  }

  validateFormBooking() {
    let validate = false;
    if (this.formBooking.valid) {
      const data = this.swapFormBooking();
      validate = this.validateStartDate(data.startDate) && this.validateEndDate(data);
    }
    return validate;
  }

  onBooking() {
    if (this.validateFormBooking()) {
      this.invalidMessage = null;
      // @ts-ignore
      this.bookingService.create(this.swapFormBooking(), this.houseId).subscribe(next => {
        this.booked = true;
      }, err => this.errorMessage = err.error.message);
    } else { this.invalidMessage = 'You must enter date first'; }
  }

  getTotal() {
    this.invalidMessage = null ;
    if (this.validateFormBooking()) {
      const data = this.swapFormBooking();
      const startDateStamp = new Date(data.startDate).getTime();
      const endDateStamp = new Date(data.endDate).getTime();
      const diffDay = (endDateStamp - startDateStamp) / (24 * 3600 * 1000);
      this.total = this.house.price * diffDay;
    }
  }
}
