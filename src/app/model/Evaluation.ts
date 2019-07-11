import {IHouse} from './House';
import {IUser} from './User';
import {IReply} from './Reply';

export interface IEvaluation {
  id: number;
  rating: number;
  comment: string;
  house: IHouse;
  user: IUser;
  replies: IReply[];
}
