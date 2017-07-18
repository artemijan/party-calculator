import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Party} from '../party/party';
import {Store} from '@ngrx/store';
import {AppStore} from '../app-store';
import {LocalStorageService} from './local-storage.service';
import {ADD_PARTIES, ADD_PARTY} from '../party/reducers';

@Injectable()
export class PartyService {
  parties: Party[];

  constructor(private store: Store<AppStore>, private localStorage: LocalStorageService) {
    store.select('parties').subscribe((parties: Array<Party>) => {
      this.parties = parties;
    });
  }

  getOrLoad() {
    if (!this.parties.length) {
      return this.localStorage.getParties()
        .then((parties) => {
          this.store.dispatch({type: ADD_PARTIES, payload: parties});
          return parties;
        })
    }
    return new Promise((resolve, reject) => {
      resolve(this.parties);
    })
  }

}
