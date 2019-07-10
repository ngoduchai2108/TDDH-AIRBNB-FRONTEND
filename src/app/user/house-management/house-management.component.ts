import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../service/house-service.service';
import {CategorieshouseService} from '../../service/categorieshouse.service';
import {CategoriesHouse} from '../../model/CategoriesHouse';
import {ImageService} from '../../service/image.service';
import {Router} from '@angular/router';
import {IHouse} from '../../model/House';


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

  selecetdFile = [];
  imagePreview = [];
  formHouseData: FormGroup;
  listhouse: IHouse[];
  private readonly INDEXCHILDIMAGES = [1, 2, 3, 4];
  filter: any;
  p: any;

  constructor(private fb: FormBuilder,
              private houseService: HouseService,
              private categoriesService: CategorieshouseService,
              private imgService: ImageService,
              private router: Router) {
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
    this.categoriesService.getCategories()
      .subscribe(next => this.listCateGories = next, err => console.log(err));
    this.updateListHouse();
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
        this.OnUploadFile(this.houseId);
        this.createFail = false;
        this.updateListHouse();
        this.formHouseData.reset();
        this.imagePreview = [];
        this.selecetdFile = [];
      }, err => this.createFail = true);

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

  updateListHouse() {
    this.houseService.getListHouseByUser()
      .subscribe(next => this.listhouse = next, err => console.log(err));
  }

  onDelete(house: any) {
    const r = confirm('Are U sure delete this house');
    if (r) {
      // @ts-ignore
      this.imgService.removeAllByHouseID(house.id).subscribe(
        next => this.houseService.remove(house.id)
          .subscribe(
            ne => {
              console.log('deleted this house');
              this.updateListHouse();
            }, err => console.log(err)),
        error => console.log(error)
      );
    }

  }
}




