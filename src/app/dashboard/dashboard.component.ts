import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Party calculator';
  isEditParticipantFormShown = false;

  constructor() { }

  ngOnInit() { }

  submit() { }

  cancel() {
    this.isEditParticipantFormShown = false;
  }

  showEditParticipantForm() {
    this.isEditParticipantFormShown = true;
  }
}
