import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesHouse} from '../../model/CategoriesHouse';
import {CategorieshouseService} from '../../service/categorieshouse.service';

@Component({
  selector: 'app-create-list-categories-house',
  templateUrl: './create-list-categories-house.component.html',
  styleUrls: ['./create-list-categories-house.component.scss']
})
export class CreateListCategoriesHouseComponent implements OnInit {
  categoriesEditForm: FormGroup;
  createCategoriesForm: FormGroup;
  categorieslist: CategoriesHouse[];
  indexofEdit = -1;
  message: string;

  constructor(private categoriesService: CategorieshouseService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createCategoriesForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.categoriesEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.categoriesService
      .getCategories()
      .subscribe(next => (this.categorieslist = next), e => console.log(e));
  }

  onDelete(categoriesHouse: CategoriesHouse) {
    const r = confirm('Are u sure delete this categoryHouse?');
    if (r) {
      this.categoriesService.remove(categoriesHouse.id).subscribe(next => {
        this.message = 'Deleted';
        this.categoriesService.getCategories()
        // tslint:disable-next-line:no-shadowed-variable
          .subscribe(next => this.categorieslist = next, err => console.log(err));
      }, err => alert(err));
    }
  }

  showEditForm(i: number, category: CategoriesHouse) {
    this.indexofEdit = i;
    this.categoriesEditForm.patchValue(category);
  }

  onEditCategory(category: CategoriesHouse) {
    if (this.categoriesEditForm.valid) {
      const {value} = this.categoriesEditForm;
      const data = {
        id: category.id,
        ...value
      };
      this.categoriesService.update(data).subscribe(next => {
        this.message = 'Edited';
        this.indexofEdit = -1 ;
        this.categoriesService.getCategories()
        // tslint:disable-next-line:no-shadowed-variable
          .subscribe(next => this.categorieslist = next, err => console.log(err));
      }, err => console.log(err));
    } else {
      this.message = 'Edit Form invalid';
    }
  }

  onCreate() {
    if (this.createCategoriesForm.valid) {
      const {value} = this.createCategoriesForm;
      this.categoriesService.create(value).subscribe(next => {
        console.log('ok');
        this.message = 'Created';
        this.createCategoriesForm.reset();
        this.categoriesService.getCategories()
        // tslint:disable-next-line:no-shadowed-variable
          .subscribe(next => this.categorieslist = next, err => {
            console.log(err);
          });
      }, err => {
        console.log(err);
        this.message = err.error.message;
      });
    }
  }
}
