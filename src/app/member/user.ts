export class User {
  id: number;
  nameFirst: string;
  nameLast: string;
  partyGoods: PartyGood[];

  constructor() {
    this.partyGoods = [];
  }
}

export class PartyGood {
  goodId: number;
  goodCount: number;
}
