import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {PartyService} from '../../services/party.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Party} from '../../party/party';
import * as _ from 'underscore';
import {LocalStorageService} from '../../services/local-storage.service';
import {Store} from '@ngrx/store';
import AppState from '../../AppState';
import {UPDATE_MEMBER} from '../../party/reducers';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  providers: [PartyService],
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {
  user = new User();
  party = new Party();
  partyIdSubscription: any;

  constructor(private db: LocalStorageService, private partyService: PartyService, private route: ActivatedRoute,
              private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {
    this.partyIdSubscription = this.route.params.subscribe(params => {
      let partyId = params['partyId'];
      let userId = params['userId'];
      this.partyService.getOrLoad()
        .then((parties: Party[]) => {
          if (!parties.length) {
            return this.router.navigate(['dashboard']);
          }
          this.party = <Party>_.findWhere(parties, {id: +partyId});
          if (!this.party || !this.party.members || !this.party.members.length) {
            return this.router.navigate(['/party', partyId]);
          }
          this.user = <User>_.findWhere(this.party.members, {id: +userId});
        });
    });
  }

  save() {
    this.db.updateMember(this.party.id, this.user)
      .then((user: User) => {
        this.store.dispatch({type: UPDATE_MEMBER, payload: {partyId: this.party.id, user: user}});
        this.router.navigate(['party', this.party.id]);
      });
  }

}
