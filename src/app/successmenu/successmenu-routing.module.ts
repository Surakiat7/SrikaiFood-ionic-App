import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessmenuPage } from './successmenu.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessmenuPageRoutingModule {}
