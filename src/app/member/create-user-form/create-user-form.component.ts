import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {Party} from '../../party/party';
import {Store} from '@ngrx/store';
import {LocalStorageService} from '../../services/local-storage.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ADD_MEMBER} from '../../party/reducers';
import {PartyService} from '../../services/party.service';
import * as _ from 'underscore';
import AppState from '../../AppState';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  providers: [PartyService],
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit {
  user = new User();
  party = new Party();

  partyIdSubscription: any;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private partyService: PartyService,
              private db: LocalStorageService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.partyIdSubscription = this.route.params.subscribe(params => {
      let id = params['id'];
      this.partyService.getOrLoad()
        .then((parties: Party[]) => {
          if (!parties.length) {
            return this.router.navigate(['dashboard']);
          }
          this.party = <Party>_.findWhere(parties, {id: +id});
        });
    });
  }

  cancel() {
    this.location.back();
  }

  ngOnDestroy() {
    this.partyIdSubscription.unsubscribe();
  }

  save() {
    let me = this;
    this.db.addMember(this.party.id, this.user)
      .then((user: User) => {
        me.store.dispatch({type: ADD_MEMBER, payload: {partyId: this.party.id, user: user}});
        me.router.navigate(['party', this.party.id]);
      });
  }
}
