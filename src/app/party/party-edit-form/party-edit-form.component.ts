import {Component, Input, OnInit} from '@angular/core';
import {Party} from '../party';
import {Store} from '@ngrx/store';
import {Location} from '@angular/common';

@Component({
  selector: 'app-party-edit-form',
  templateUrl: './party-edit-form.component.html',
  styleUrls: ['./party-edit-form.component.css']
})
export class PartyEditFormComponent implements OnInit {

  @Input() party: Party;

  constructor(private location: Location, private store: Store<Party[]>) {
  }

  ngOnInit() {

  }

  cancel() {
    this.location.back();
  }

  save() {

  }

}
