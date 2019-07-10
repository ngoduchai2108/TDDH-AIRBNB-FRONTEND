import {IHouse} from './House';
import {IUser} from './User';

export interface IBooking {
  id: number;
  oderDate: string;
  startDate: string;
  endDate: string;
  house: IHouse;
  user: IUser;
  checkIn: string;
}
