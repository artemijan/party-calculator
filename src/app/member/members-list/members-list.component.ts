import {Component, OnInit} from '@angular/core';
import {Party} from '../../party/party';
import {ActivatedRoute, Router} from '@angular/router';
import {PartyService} from '../../services/party.service';
import * as _ from 'underscore';
import {User} from '../user';
import {LocalStorageService} from '../../services/local-storage.service';
import {Store} from '@ngrx/store';
import AppState from '../../AppState';
import {DELETE_MEMBER} from '../../party/reducers';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  providers: [PartyService],
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  party = new Party();

  constructor(private route: ActivatedRoute, private router: Router, private partyService: PartyService,
              private db: LocalStorageService, private store: Store<AppState>) {

  }

  ngOnInit() {
    let id = +this.route.parent.snapshot.paramMap.get('id');
    this.partyService.getOrLoad()
      .then((parties: Party[]) => {
        if (!parties.length) {
          return this.router.navigate(['dashboard']);
        }
        this.party = _.findWhere(parties, {id: +id});
        console.log(id);
      });
  }

  deleteMember(member: User) {
    this.db.deleteMember(this.party.id, member.id)
      .then((member: User) => {
        this.store.dispatch({type: DELETE_MEMBER, payload: {partyId: this.party.id, memberId: member.id}});
        this.ngOnInit();
      });
  }
}
