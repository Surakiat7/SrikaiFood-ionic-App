import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'menu/:data',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'menuporka',
    loadChildren: () => import('./menuporka/menuporka.module').then( m => m.MenuporkaPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'menuedit',
    loadChildren: () => import('./menuedit/menuedit.module').then( m => m.MenueditPageModule)
  },
  {
    path: 'confirmmenu/:data',
    loadChildren: () => import('./confirmmenu/confirmmenu.module').then( m => m.ConfirmmenuPageModule)
  },
  {
    path: 'successmenu/:datas',
    loadChildren: () => import('./successmenu/successmenu.module').then( m => m.SuccessmenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
