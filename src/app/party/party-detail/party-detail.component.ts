import {Component, OnInit} from '@angular/core';
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
  navLinks;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private partyService: PartyService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.navLinks = [
      {
        state: ["/party", id, 'members'],
        label: "Members"
      },
      {
        state: ["/party", id, 'goods'],
        label: "Goods"
      }
    ];
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

  goBack() {
    this.location.back();
  }

}
