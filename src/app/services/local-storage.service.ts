import {Injectable} from '@angular/core';
import {Party} from '../party/party';
import {User} from '../member/user';
import * as _ from 'underscore';
import {AppStore} from '../app-store';

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
      user.id = (<User>_.last(selectedParty.members)).id++;
    }
    selectedParty.members.push(user);
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(user);
    });
  }

  addParty(party: Party) {
    let db = this.getDb(), id = 0;
    if (db.parties.lenth) {
      id = db.parties[db.parties.length - 1].id++;
    }
    party.id = id;
    db.parties.push(party);
    this.setDb(db);
    return new Promise((resolve, reject) => {
      resolve(party);
    });
  }

}
