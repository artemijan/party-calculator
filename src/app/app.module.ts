import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {MemberModule} from './member/member.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {GoodModule} from './good/good.module';
import {MdButtonModule, MdToolbarModule} from '@angular/material';
import {RoutesModule} from './routes/routes.module';
import {PartyModule} from './party/party.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {partyReducer} from './party/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    RoutesModule,
    RouterModule,
    BrowserAnimationsModule,
    BrowserModule,
    PartyModule,
    MemberModule,
    GoodModule,
    FormsModule,
    MdButtonModule,
    MdToolbarModule,
    StoreModule.provideStore(partyReducer),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
