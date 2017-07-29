import {Component, OnInit} from '@angular/core';
import {Party} from '../../party/party';
import {ActivatedRoute, Router} from '@angular/router';
import {PartyService} from '../../services/party.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  providers: [PartyService],
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  party = new Party();

  constructor(private route: ActivatedRoute, private router: Router, private partyService: PartyService) {

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
}
