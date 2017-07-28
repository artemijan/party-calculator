import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Party} from '../party';
import * as _ from 'underscore';
import {PartyService} from '../../services/party.service';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  providers: [PartyService],
  styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {
  party = new Party();
  tab: number;
  tabs = [0, 1];

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private partyService: PartyService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.tab = +this.route.snapshot.paramMap.get('tab');
    this.partyService.getOrLoad()
      .then((parties: Party[]) => {
        if (!parties.length) {
          return this.router.navigate(['dashboard']);
        }
        this.party = _.findWhere(parties, {id: +id});
      });
  }

  ngOnDestroy() {
  }

  onTabChanged(tab) {
    console.log(tab);
    this.location.replaceState("party/" + this.party.id + "/tab/" + tab);
  }

  goBack() {
    this.location.back();
  }

}
