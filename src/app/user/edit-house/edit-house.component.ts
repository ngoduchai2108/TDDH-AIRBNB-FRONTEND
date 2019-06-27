import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImageService} from "../../service/image.service";
import {CategoriesHouse} from "../../model/CategoriesHouse";
import {HouseService} from "../../service/house-service.service";
import {CategorieshouseService} from "../../service/categorieshouse.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.scss']
})
export class EditHouseComponent implements OnInit {

  imageToShow: any;
  formHouseData: FormGroup;
  editFail = false;
  listCateGories: CategoriesHouse[];
  currentHouse ={
    categories: {name:''}
  };
  listCurrentImageId = [];

  constructor(private  imageService: ImageService,
              private houseService: HouseService,
              private cateService: CategorieshouseService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
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
    // this.getImageFromService();
    const id = +this.route.snapshot.paramMap.get('id');

    this.houseService.getHouse(id).subscribe(next => {
      this.currentHouse = next;
      console.log(next);
      this.formHouseData.patchValue(this.currentHouse)
    }, error => console.log(error));
    this.cateService.getCategories().subscribe(next => {
      this.listCateGories = next;
    })
    // this.imageService.getListIdByHouseId(id).subscribe(next => this.listCurrentImageId = next);

  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() {
    this.imageService.getImage(72).subscribe(data => {
      this.createImageFromBlob(data);
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  editHouse() {
    if (this.formHouseData.valid){
      const {value} = this.formHouseData;
      const data = {
        ...this.currentHouse,
        ...value
      };
      console.log(data);
      this.houseService.update(data).subscribe(next => {
        this.router.navigate(['/houses']),
          error => {
          console.log(error);
          }
      });
    }
  }
}

