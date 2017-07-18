import {User} from '../member/user';
import {Good} from '../good/good';

export class Party {
  id: number;
  name: string;
  members: User[];
  goods: Good[];

  constructor() {
    this.members = [];
    this.goods = [];
  }
}
