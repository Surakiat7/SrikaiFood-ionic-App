import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmmenuPage } from './confirmmenu.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmmenuPageRoutingModule {}
