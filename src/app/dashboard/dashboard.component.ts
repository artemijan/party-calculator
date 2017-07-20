import {Component, OnInit} from '@angular/core';
import {Party} from '../party/party';
import {PartyService} from '../services/party.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [PartyService],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  parties: Party[] = [];

  constructor(private partyService: PartyService) {
  }

  ngOnInit() {
    this.partyService.getOrLoad()
      .then((parties: Party[]) => {
        this.parties = parties;
      });

  }

}
