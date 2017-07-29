import {Injectable} from '@angular/core';
import {Party} from '../party/party';
import {User} from '../member/user';
import * as _ from 'underscore';
import {AppStore} from '../app-store';
import {Good} from '../good/good';

@Injectable()
export class LocalStorageService {

  key = 'db';

  constructor() {
    if (!this.getDb()) {
      this.setDb(<AppStore>{"parties": []});
    }
  }

  setDb(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getDb() {
    return JSON.parse(localStorage.getItem(this.key));
  }


  getParties() {
    let db = this.getDb();
    return new Promise((resolve, reject) => {
      resolve(db.parties);
    });
  }

  addMember(partyId: number, user: User) {
    let db = this.getDb();
    let selectedParty = <Party>_.findWhere(db.parties, {id: partyId});
    user.id = 0;
    if (selectedParty.members.length) {
      user.id = (<User>_.last(selectedParty.members)).id + 1;
    }
    selectedParty.members.push(user);
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(user);
    });
  }

  addGood(partyId: number, good: Good) {
    let db = this.getDb();
    let selectedParty = <Party>_.findWhere(db.parties, {id: partyId});
    good.id = 0;
    if (selectedParty.goods.length) {
      good.id = (<Good>_.last(selectedParty.goods)).id + 1;
    }
    selectedParty.goods.push(good);
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(good);
    });
  }

  updateMember(partyId: number, user: User) {
    let db = this.getDb();
    let selectedParty = <Party>_.findWhere(db.parties, {id: +partyId});
    let selectedUser = <User>_.findWhere(selectedParty.members, {id: +user.id});
    selectedUser.nameLast = user.nameLast;
    selectedUser.nameFirst = user.nameFirst;
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(user);
    });
  }

  deleteMember(partyId: number, memberId: number) {
    let db = this.getDb();
    let deletedMember;
    let selectedParty = <Party>_.findWhere(db.parties, {id: +partyId});
    selectedParty.members = _.filter(<Array<User>>selectedParty.members, member => {
      if (member.id === +memberId) {
        deletedMember = member;
        return false;
      }
      return true;
    });
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(deletedMember)
    });
  }

  updateGood(partyId: number, good: Good) {
    let db = this.getDb();
    let selectedParty = <Party>_.findWhere(db.parties, {id: +partyId});
    let selectedGood = <Good>_.findWhere(selectedParty.goods, {id: +good.id});
    selectedGood.name = good.name;
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(good);
    });
  }

  deleteGood(partyId: number, goodId: number) {
    let db = this.getDb();
    let deletedGood;
    let selectedParty = <Party>_.findWhere(db.parties, {id: +partyId});
    selectedParty.goods = _.filter(<Array<Good>>selectedParty.goods, good => {
      if (good.id === goodId) {
        deletedGood = good;
        return false;
      }
      return true;
    });
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(deletedGood)
    });
  }

  addParty(party: Party) {
    let db = this.getDb(), id = 0;
    if (db.parties.length) {
      id = (<Party>_.last(db.parties)).id + 1;
    }
    party.id = id;
    db.parties.push(party);
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(party);
    });
  }

  updateParty(party: Party) {
    let db = this.getDb();
    let selectedParty = <Party>_.findWhere(db.parties, {id: +party.id});
    selectedParty.name = party.name;
    selectedParty.members = party.members;
    selectedParty.goods = party.goods;

    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(party);
    });
  }

  deleteParty(partyId: number) {
    let db = this.getDb();
    let deletedParty;
    db.parties = _.filter(<Array<Party>>db.parties, party => {
      if (party.id === partyId) {
        deletedParty = party;
        return false;
      }
      return true;
    });
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(deletedParty)
    });
  }

}
