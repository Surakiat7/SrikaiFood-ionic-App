import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenueditPage } from './menuedit.page';

const routes: Routes = [
  {
    path: '',
    component: MenueditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenueditPageRoutingModule {}
