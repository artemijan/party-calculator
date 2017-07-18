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
  private partyIdSubscription: any;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private partyService: PartyService) {
  }

  ngOnInit() {
    this.partyIdSubscription = this.route.params.subscribe(params => {
      let id = params['id'];
      this.partyService.getOrLoad()
        .then((parties: Party[]) => {
          if (!parties.length) {
            return this.router.navigate(['dashboard']);
          }
          this.party = _.findWhere(parties, {id: +id});
        });
    });
  }

  ngOnDestroy() {
    this.partyIdSubscription.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

}
