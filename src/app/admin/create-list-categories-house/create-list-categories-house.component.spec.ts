import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListCategoriesHouseComponent } from './create-list-categories-house.component';

describe('CreateListCategoriesHouseComponent', () => {
  let component: CreateListCategoriesHouseComponent;
  let fixture: ComponentFixture<CreateListCategoriesHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateListCategoriesHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListCategoriesHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
