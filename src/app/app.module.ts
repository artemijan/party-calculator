import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ParticipantModule} from './participant/participant.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {GoodModule} from './good/good.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]),
    BrowserModule,
    ParticipantModule,
    GoodModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
