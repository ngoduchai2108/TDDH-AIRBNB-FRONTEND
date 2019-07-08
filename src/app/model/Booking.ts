import {IHouse} from './House';

export interface IBooking {
  id: number;
  oderDate: string;
  startDate: string;
  endDate: string;
  house: IHouse;
}
