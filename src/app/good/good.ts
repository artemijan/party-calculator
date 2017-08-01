export class Good {
  name: string;
  id: number;
  buyers: Buyer[];

  constructor() {
    this.buyers = [];
  }
}

export class Buyer {
  userId: number;
  totalPrice: number;
}
