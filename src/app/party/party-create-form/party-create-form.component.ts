import {Component, OnInit} from '@angular/core';
import {Party} from '../party';
import {Location} from '@angular/common';
import {ADD_PARTY} from '../reducers';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-party-create-form',
  templateUrl: './party-create-form.component.html',
  styleUrls: ['./party-create-form.component.css']
})
export class PartyCreateFormComponent implements OnInit {

  party = new Party();

  constructor(private location: Location, private store: Store<Party[]>) {
  }

  ngOnInit() {
  }

  cancel() {
    this.location.back();
  }

  save() {
    this.store.dispatch({type: ADD_PARTY, payload: this.party});
  }

}
