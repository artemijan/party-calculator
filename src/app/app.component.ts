import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Party calculator';

  constructor(private route: ActivatedRoute, private location: Location) {
    this.location = location;
    this.route = route;
  }
}
