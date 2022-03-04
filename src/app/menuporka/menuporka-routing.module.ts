import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuporkaPage } from './menuporka.page';

const routes: Routes = [
  {
    path: '',
    component: MenuporkaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuporkaPageRoutingModule {}
