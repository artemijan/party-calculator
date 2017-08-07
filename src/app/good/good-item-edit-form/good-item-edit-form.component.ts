import {Component, Inject, OnInit} from '@angular/core';
import {Party} from '../../party/party';
import {Buyer, Good} from '../good';
import {LocalStorageService} from '../../services/local-storage.service';
import {PartyService} from '../../services/party.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import AppState from '../../AppState';
import * as _ from 'underscore';
import {UPDATE_GOOD} from '../../party/reducers';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import {User} from '../../member/user';

@Component({
  selector: 'app-good-item-edit-form',
  templateUrl: './good-item-edit-form.component.html',
  providers: [PartyService],
  styleUrls: ['./good-item-edit-form.component.css']
})
export class GoodItemEditFormComponent implements OnInit {

  good = new Good();
  party = new Party();
  buyerMembers: Array<any>;

  constructor(private db: LocalStorageService, private partyService: PartyService, private route: ActivatedRoute,
              private router: Router, private store: Store<AppState>, public dialog: MdDialog) {
  }

  ngOnInit() {
    this.buyerMembers = [];
    const partyId = +this.route.snapshot.paramMap.get('partyId');
    const goodId = +this.route.snapshot.paramMap.get('goodId');
    this.partyService.getOrLoad()
      .then((parties: Party[]) => {
        if (!parties.length) {
          return this.router.navigate(['dashboard']);
        }
        this.party = <Party>_.findWhere(parties, {id: +partyId});
        if (!this.party || !this.party.goods || !this.party.members.length) {
          return this.router.navigate(['/party', partyId]);
        }
        this.good = <Good>_.findWhere(this.party.goods, {id: +goodId});
        if (!this.good.buyers) {
          this.good.buyers = [];
        } else {
          let userIdsToRemove = [];
          this.buyerMembers = this.good.buyers.filter(buyer => {
            let user = <User>_.findWhere(this.party.members, {id: +buyer.userId});
            if (!user) {
              userIdsToRemove.push(buyer.userId);
            }
            return !!user;
          }).map(buyer => {
            let user = <User>_.findWhere(this.party.members, {id: +buyer.userId});
            return _.extend({}, buyer, user);
          });
          //todo: remove it when backend will be available
          this.good.buyers = this.good.buyers.filter(buyer => userIdsToRemove.indexOf(buyer.userId) < 0);
          this.db.updateGood(this.party.id, this.good)
            .then((good: Good) => this.good = good);
        }
      });
  }

  addBuyer() {
    let dialogRef = this.dialog.open(BuyerEditDialog, {data: {party: this.party, good: this.good}});
    dialogRef.afterClosed().subscribe(result => {
      var user = _.findWhere(this.party.members, {id: +result.userId});
      this.buyerMembers.push(_.extend({}, result, user));
      this.good.buyers.push(result);
    });
  }

  deleteBuyer(buyer) {
    this.good.buyers = this.good.buyers.filter(buyerObj => buyer.userId !== buyerObj.userId);
    this.buyerMembers = this.buyerMembers.filter(buyerObj => buyer.userId !== buyerObj.userId)
  }

  save() {
    this.db.updateGood(this.party.id, this.good)
      .then((good: Good) => {
        this.store.dispatch({type: UPDATE_GOOD, payload: {partyId: this.party.id, good: good}});
        this.router.navigate(['party', this.party.id, 'goods']);
      });
  }
}


@Component({
  selector: 'buyer-edit-dialog',
  templateUrl: './buyer-edit-dialog.component.html',
  styleUrls: ['./buyer-edit-dialog.component.css']
})
export class BuyerEditDialog {
  name: string;
  members: any;
  selectedUser: any;
  totalPrice: number;

  constructor(public dialogRef: MdDialogRef<BuyerEditDialog>, @Inject(MD_DIALOG_DATA) public data: any) {
    this.members = data.party.members.filter(member => {
      return !_.findWhere(data.good.buyers, {userId: member.id});
    });
  }

  save() {
    if (this.selectedUser == null || !this.totalPrice) {
      return;
    }
    this.dialogRef.close(<Buyer>{userId: this.selectedUser, totalPrice: +this.totalPrice});
  }

  cancel() {
    this.dialogRef.close();
  }
}
