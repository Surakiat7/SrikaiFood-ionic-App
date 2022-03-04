import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuporkaPageRoutingModule } from './menuporka-routing.module';

import { MenuporkaPage } from './menuporka.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuporkaPageRoutingModule
  ],
  declarations: [MenuporkaPage]
})
export class MenuporkaPageModule {}
