import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Party} from '../party';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {
  party: Party;

  constructor(private route: ActivatedRoute, private location: Location) {
    this.location = location;
  }

  ngOnInit() {
    this.party = new Party();
  }


  goBack() {
    this.location.back();
  }

}
