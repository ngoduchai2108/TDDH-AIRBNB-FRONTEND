import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImageService} from "../../service/image.service";
import {CategoriesHouse} from "../../model/CategoriesHouse";
import {HouseService} from "../../service/house-service.service";
import {CategorieshouseService} from "../../service/categorieshouse.service";
import {ActivatedRoute, Router} from "@angular/router";
import {of} from "rxjs";
import {IImageToShow} from "../../model/image-to-show";

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.scss']
})
export class EditHouseComponent implements OnInit {

  listImageToShow: IImageToShow[] = [];
  formHouseData: FormGroup;
  editFail = false;
  listCateGories: CategoriesHouse[];
  currentHouse ={
    categories: {name:''}
  };
  listCurrentImageId = [];
  INDEXCHILDIMAGES = [1,2,3,4];
  private selecetdFile: [];
  delete1: any;
  delete2: any;

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
    });
    this.imageService.getListIdByHouseId(id).subscribe(next => {this.listCurrentImageId = next; this.getAllImageFromService()  })
  }

  createImageFromBlob(image: Blob,idImage : number) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageToShow = {
        id: idImage,
        image: reader.result
      }
      this.listImageToShow.push(imageToShow);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService(id:number) {
    this.imageService.getImage(id).subscribe(data => {
      this.createImageFromBlob(data,id);
    }, error => {
      console.log('aaa'+ error);
    });
  }
  getAllImageFromService(){
    for ( var idImage of this.listCurrentImageId) {
      this.getImageFromService(idImage);
    }
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
//
//   onFileUpload($event: Event, number: number) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.listImageToShow[number] = reader.result;
//     };
//     this.selecetdFile[number] = event.target.files[0];
//     reader.readAsDataURL(this.selecetdFile[number]);
// }

  deleteImage(id: number) {
    const r = confirm('Are U sure delete this image');
    if (r) {
      this.imageService.remove(id).subscribe(next => {
        console.log("delete this image");
      }, error => console.log(error))
    }
  }
}


