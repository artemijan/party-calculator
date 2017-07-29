import {Component, OnInit} from '@angular/core';
import {Party} from '../party/party';
import {PartyService} from '../services/party.service';
import {LocalStorageService} from '../services/local-storage.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import AppState from '../AppState';
import {DELETE_PARTY} from '../party/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [PartyService],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  parties: Party[] = [];

  constructor(private partyService: PartyService, private router: Router, private db: LocalStorageService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.partyService.getOrLoad()
      .then((parties: Party[]) => {
        this.parties = parties;
      });
  }

  deleteParty(party: Party) {
    this.db.deleteParty(party.id)
      .then((party: Party) => {
        this.store.dispatch({type: DELETE_PARTY, payload: {partyId: party.id}});
        this.ngOnInit();
      });
  }

}
