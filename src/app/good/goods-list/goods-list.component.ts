import {Component, Input, OnInit} from '@angular/core';
import {Party} from '../../party/party';
import {ActivatedRoute, Router} from '@angular/router';
import {PartyService} from '../../services/party.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  providers: [PartyService],
  styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {
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
      });
  }

}