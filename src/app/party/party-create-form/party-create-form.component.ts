import {Component, OnInit} from '@angular/core';
import {Party} from '../party';
import {Location} from '@angular/common';
import {ADD_PARTY} from '../reducers';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import AppState from '../../AppState';

@Component({
  selector: 'app-party-create-form',
  templateUrl: './party-create-form.component.html',
  styleUrls: ['./party-create-form.component.css']
})
export class PartyCreateFormComponent implements OnInit {

  party = new Party();

  constructor(private location: Location, private router: Router, private db: LocalStorageService, private store: Store<AppState>) {

  }

  ngOnInit() {
  }

  cancel() {
    this.location.back();
  }

  save() {
    this.db.addParty(this.party)
      .then((party: Party) => {
        this.store.dispatch({type: ADD_PARTY, payload: party});
        this.router.navigate(['party', party.id]);
      });
  }

}
