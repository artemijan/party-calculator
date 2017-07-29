import {Component, OnInit} from '@angular/core';
import {Party} from '../../party/party';
import {Good} from '../good';
import {LocalStorageService} from '../../services/local-storage.service';
import {PartyService} from '../../services/party.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import AppState from '../../AppState';
import * as _ from 'underscore';
import {UPDATE_GOOD} from '../../party/reducers';

@Component({
  selector: 'app-good-item-edit-form',
  templateUrl: './good-item-edit-form.component.html',
  providers: [PartyService],
  styleUrls: ['./good-item-edit-form.component.css']
})
export class GoodItemEditFormComponent implements OnInit {

  good = new Good();
  party = new Party();

  constructor(private db: LocalStorageService, private partyService: PartyService, private route: ActivatedRoute,
              private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    const partyId = +this.route.snapshot.paramMap.get('partyId');
    const goodId = +this.route.snapshot.paramMap.get('goodId');
    this.partyService.getOrLoad()
      .then((parties: Party[]) => {
        if (!parties.length) {
          return this.router.navigate(['dashboard']);
        }
        this.party = <Party>_.findWhere(parties, {id: +partyId});
        if (!this.party || !this.party.goods || !this.party.members.length) {
          return this.router.navigate(['/party', partyId]);
        }
        this.good = <Good>_.findWhere(this.party.goods, {id: +goodId});
      });
  }

  save() {
    this.db.updateGood(this.party.id, this.good)
      .then((good: Good) => {
        this.store.dispatch({type: UPDATE_GOOD, payload: {partyId: this.party.id, good: good}});
        this.router.navigate(['party', this.party.id, 'goods']);
      });
  }
}
