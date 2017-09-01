import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PartyService} from '../../services/party.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {Store} from '@ngrx/store';
import AppState from '../../AppState';
import {Party} from '../party';
import * as _ from 'underscore';
import {PartyChart} from './partyChart';


@Component({
  selector: 'app-party-calculations',
  templateUrl: './party-calculations.component.html',
  providers: [PartyService],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./party-calculations.component.css']
})
export class PartyCalculationsComponent implements OnInit {
  party: Party;
  chart: PartyChart;
  private containerId = "chart-container";

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
        this.party = Party.fromObject(_.findWhere(parties, {id: +id}));
        this.chart = new PartyChart(this.party, this.containerId);
      });
  }

}
