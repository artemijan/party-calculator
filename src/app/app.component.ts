/**
 * Created by arrtem on 6/26/17.
 */
import {Component} from "@angular/core";
@Component({
  selector: 'my-app',
  styleUrls:['./app.components.css'],
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'My Heroes';
}
