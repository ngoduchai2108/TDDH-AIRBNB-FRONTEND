import {IUser} from './User';

export interface IReply {
  id: number;
  content: string;
  user: IUser;
}
