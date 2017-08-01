import {NgModule} from '@angular/core';
import {GoodItemComponent} from './good-item/good-item.component';
import {
  BuyerEditDialog,
  GoodItemEditFormComponent
} from './good-item-edit-form/good-item-edit-form.component';
import {FormsModule} from '@angular/forms';
import {GoodCreateFormComponent} from './good-create-form/good-create-form.component';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdInputModule, MdSelectModule,
  MdTabsModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MdInputModule,
    MdButtonModule,
    RouterModule,
    MdCardModule,
    MdTabsModule,
    MdDialogModule,
    MdSelectModule
  ],
  declarations: [GoodItemComponent, GoodItemEditFormComponent, GoodCreateFormComponent, GoodsListComponent, BuyerEditDialog],
  entryComponents: [BuyerEditDialog]
})
export class GoodModule {
}
