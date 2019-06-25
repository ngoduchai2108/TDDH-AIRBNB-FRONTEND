import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-house-management',
  templateUrl: './house-management.component.html',
  styleUrls: ['./house-management.component.scss']
})
export class HouseManagementComponent implements OnInit {


  constructor() {
    for (let i = 0; i < this.homeData.count; i++) {
      this.homeData.data.push(
        {
          id: i + 1,
          value: 'items number' + (i + 1)
        }
      );
    }
  }
  formData;
  private http: any;
  private selectedFile: any;
  homeData = {count: 60, data: [], push( row: {
    address: any
    price: number;
    name: any;
    categories: any;
    bathroom: number;
    bedroom: number }) {
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

  selecetdFile: File;
  imagePreview: string | ArrayBuffer;
  private uploadData: any;

  onPageChange(event) {
    console.log(event);
    this.config.currentPage = event;
  }


  ngOnInit() {
    this.formData = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      categories: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      bathroom: new FormControl(''),
      bedroom: new FormControl(''),
      price: new FormControl('')
    });
  }

  onFileUpload(event) {
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selecetdFile);
  }

  OnUploadFile() {
// Upload file here send a Form data
    const uploadFormData = new FormData();
    this.uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.http.post('yourdomain.com/file-upload', uploadFormData);
  }

  onClickSubmit(data) {
    document.getElementById('homeTable').style.display = '';
    const row = {
      name: data.name,
      categories: data.categories,
      address: data.address,
      bathroom: data.bathroom,
      bedroom: data.bedroom,
      price: data.price,
    };
    this.homeData.push(row);
    console.log(this.homeData);
  }

}




