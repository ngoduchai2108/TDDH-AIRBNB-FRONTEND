import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../common/token/token-storage.service';
import {BookingService} from '../../service/booking.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IBooking} from '../../model/Booking';
import {IIncome} from '../../model/Income';
import {IncomeService} from '../../service/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  listIncome: IIncome[];
  filter: any;
  p: any;
  month: string;
  year: string;
  searchForm: FormGroup;

  constructor(private incomeService: IncomeService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getMonthYear();
    this.getIncomes(this.month, this.year);
    this.searchForm = this.fb.group({
      month: [''],
      year: ['']
    });
    this.getTotal();
  }

  getIncomes(month: string, year: string) {
    this.incomeService.getIncomes(month, year).subscribe(
      data => {
        console.log(data);
        this.listIncome = data;
      }, error => {
        console.log('loi: ' + error);
      });
  }

  getMonthYear() {
    const nowStamp = new Date();
    if (nowStamp.getMonth() <= 9) {
      this.month = '0' + nowStamp.getMonth();
    } else {
      this.month = nowStamp.getMonth().toString();
    }
    this.year = nowStamp.getFullYear().toString();
  }

  onSubmit() {
    const {value} = this.searchForm;
    console.log(value);
    this.incomeService.getIncomes(value.month, value.year).subscribe(
      data => {
        this.listIncome = data;
        console.log(data);
      }, err => console.log(err));
  }
  getTotal() {
    let total = 0;
    for (const income of this.listIncome) {
        total += income.income;
    }
    return total;
  }
}
