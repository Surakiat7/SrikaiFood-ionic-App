import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmmenuPageRoutingModule } from './confirmmenu-routing.module';

import { ConfirmmenuPage } from './confirmmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmmenuPageRoutingModule
  ],
  declarations: [ConfirmmenuPage]
})
export class ConfirmmenuPageModule {}
