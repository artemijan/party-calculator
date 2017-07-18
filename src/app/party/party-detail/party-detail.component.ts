import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {
  partyId: number;
  isEditParticipantFormShown = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.partyId = +this.route.snapshot.paramMap.get('id');
  }

  submit() { }

  cancel() {
    this.isEditParticipantFormShown = false;
  }

  showEditParticipantForm() {
    this.isEditParticipantFormShown = true;
  }

}
