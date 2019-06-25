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
  category1: CategoriesHouse = {id: 1, name: 'Biet Thu hang sang'};
  category2: CategoriesHouse = {id: 2, name: 'Biet Thu cap 4'};
  category3: CategoriesHouse = {id: 3, name: 'Biet Thu trung binh'};
  category4: CategoriesHouse = {id: 4, name: 'Biet Thu 3*'};
  category5: CategoriesHouse = {id: 5, name: 'Biet Thu 4*'};
  categorieslist: CategoriesHouse[] = [this.category1, this.category2, this.category3, this.category4, this.category5];
  indexofEdit = -1;

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
      this.categoriesService.remove(categoriesHouse.id).subscribe(next => this.indexofEdit = -1, err => alert(err));
    }
  }

  showEditForm(i: number, category: CategoriesHouse) {
    this.indexofEdit = i;
    this.categoriesEditForm.patchValue(category);
  }

  onEditCategory() {

  }
}
