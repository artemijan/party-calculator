import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MemberModule} from './member/member.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {GoodModule} from './good/good.module';
import {MdButtonModule, MdToolbarModule} from '@angular/material';
import {PartyDetailComponent} from './party/party-detail/party-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PartyDetailComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'party/:id',
        component: PartyDetailComponent
      }
    ]),
    BrowserAnimationsModule,
    BrowserModule,
    MemberModule,
    GoodModule,
    FormsModule,
    MdButtonModule,
    MdToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
