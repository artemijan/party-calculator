import {Component, Input, OnInit} from '@angular/core';
import {Party} from '../party';
import {Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {AppStore} from '../../app-store';
import {PartyService} from '../../services/party.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'underscore';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../member/user';
import {UPDATE_PARTY} from '../reducers';

@Component({
  selector: 'app-party-edit-form',
  templateUrl: './party-edit-form.component.html',
  providers: [PartyService],
  styleUrls: ['./party-edit-form.component.css']
})
export class PartyEditFormComponent implements OnInit {

  party: Party = new Party();
  partyIdSubscription: any;

  constructor(private location: Location, private store: Store<AppStore>, private partyService: PartyService,
              private route: ActivatedRoute, private router: Router, private db: LocalStorageService) {
  }

  ngOnInit() {
    this.partyIdSubscription = this.route.params.subscribe(params => {
      let partyId = params['id'];
      this.partyService.getOrLoad()
        .then((parties: Party[]) => {
          this.party = <Party>_.findWhere(parties, {id: +partyId});
          if (!parties.length || !this.party) {
            return this.router.navigate(['dashboard']);
          }
        });
    });
  }

  save() {
    this.db.updateParty(this.party)
      .then((user: User) => {
        this.store.dispatch({type: UPDATE_PARTY, payload: this.party});
        this.router.navigate(['party', this.party.id]);
      });
  }

}
