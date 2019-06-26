import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../service/house-service.service';
import {CategorieshouseService} from '../../service/categorieshouse.service';
import {CategoriesHouse} from '../../model/CategoriesHouse';
import {ImageService} from '../../service/image.service';


@Component({
  selector: 'app-house-management',
  templateUrl: './house-management.component.html',
  styleUrls: ['./house-management.component.scss']
})
export class HouseManagementComponent implements OnInit {
  listCateGories: CategoriesHouse[];
  houseId: number;
  formData;
  createFail: boolean;
  homeData = {
    count: 60, data: [], push(row: {
      address: any
      price: number;
      name: any;
      categories: any;
      bathroom: number;
      bedroom: number
    }) {
    }
  };
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.homeData.count
  };
  public maxSize = 7;
  public directionLinks = true;
  public autoHide = false;
  public responsive = true;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  selecetdFile = [];
  imagePreview = [];
  imagePreview1: string | ArrayBuffer;
  imagePreview2: string | ArrayBuffer;
  formHouseData: FormGroup;
  private readonly INDEXCHILDIMAGES = [1, 2, 3, 4];

  constructor(private fb: FormBuilder,
              private houseService: HouseService,
              private categoriesService: CategorieshouseService,
              private imgService: ImageService) {
  }

  ngOnInit() {
    this.formHouseData = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      categories: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      quantityBathroom: ['', [Validators.required, Validators.min(1)]],
      quantityBedroom: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
    this.categoriesService.getCategories().subscribe(next => this.listCateGories = next, err => console.log(err));
  }

  onFileUpload(event, index: number) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview[index] = reader.result;
    };
    this.selecetdFile[index] = event.target.files[0];
    reader.readAsDataURL(this.selecetdFile[index]);
  }


  createHouse() {
    if (this.formHouseData.valid) {
      const {value} = this.formHouseData;
      this.houseService.create(value).subscribe(next => {
        this.houseId = next;
        const house = {
          id: this.houseId,
          ...value
        };
        this.OnUploadFile(this.houseId);
        console.log(house);
        this.createFail = false;
      }, err => this.createFail = true );

    } else {
      this.createFail = true;
    }
  }

  OnUploadFile(id: number) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selecetdFile.length; i++) {
      const fd = new FormData();
      if (this.selecetdFile[i] !== undefined) {
        fd.append('file', this.selecetdFile[i], this.selecetdFile[i].name);
        this.imgService.create(id, fd).subscribe(next => console.log('ok'),
          err => console.log(err));
      }
    }
  }
}




