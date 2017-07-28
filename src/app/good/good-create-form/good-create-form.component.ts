import {Component, OnInit} from '@angular/core';
import {Party} from '../../party/party';
import {Good} from '../good';
import {ActivatedRoute, Router} from '@angular/router';
import {PartyService} from '../../services/party.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {Store} from '@ngrx/store';
import AppState from '../../AppState';
import {ADD_GOOD} from '../../party/reducers';
import * as _ from 'underscore';

@Component({
  selector: 'app-good-create-form',
  providers: [PartyService],
  templateUrl: './good-create-form.component.html',
  styleUrls: ['./good-create-form.component.css']
})

export class GoodCreateFormComponent implements OnInit {

  good = new Good();

  party = new Party();

  constructor(private route: ActivatedRoute, private router: Router, private partyService: PartyService,
              private db: LocalStorageService, private store: Store<AppState>) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.partyService.getOrLoad()
      .then((parties: Party[]) => {
        if (!parties.length) {
          return this.router.navigate(['dashboard']);
        }
        this.party = <Party>_.findWhere(parties, {id: +id});
      });
  }

  save() {
    this.db.addGood(this.party.id, this.good)
      .then((good: Good) => {
        this.store.dispatch({type: ADD_GOOD, payload: {partyId: this.party.id, good: good}});
        this.router.navigate(['party', this.party.id, 'tab', 1]);
      });
  }

}
