import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessmenuPageRoutingModule } from './successmenu-routing.module';

import { SuccessmenuPage } from './successmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessmenuPageRoutingModule
  ],
  declarations: [SuccessmenuPage]
})
export class SuccessmenuPageModule {}
