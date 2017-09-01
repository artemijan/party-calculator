import {PartyGood, User} from '../member/user';
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

  static fromObject = (party: Party): Party => {
    let me = new Party();
    me.id = party.id;
    me.name = party.name;
    me.members = party.members;
    me.goods = party.goods;
    return me;
  };

  getTotalConsumed = (good: Good): number => {
    let total = 0;
    this.members.forEach(function (member: User) {
      member.partyGoods.forEach(function (partyGood: PartyGood) {
        if (partyGood.goodId === good.id) {
          total += partyGood.goodCount;
        }
      });
    });
    return total;
  };

  getTotalSpent = (good: Good): number => {
    let total = 0;
    good.buyers.forEach(function (buyer) {
      total += buyer.totalPrice;
    });
    return total;
  }
}
