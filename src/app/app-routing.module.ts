import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'st-adm',
    loadChildren: () => import('./pages/st-adm/st-adm.module').then( m => m.StAdmPageModule)
  },
  {
    path: 'st-details',
    loadChildren: () => import('./pages/st-details/st-details.module').then( m => m.StDetailsPageModule)
  },
  {
    path: 'installments',
    loadChildren: () => import('./pages/installments/installments.module').then( m => m.InstallmentsPageModule)
  },
  {
    path: 'see-installments',
    loadChildren: () => import('./pages/see-installments/see-installments.module').then( m => m.SeeInstallmentsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'add-amount',
    loadChildren: () => import('./pages/add-amount/add-amount.module').then( m => m.AddAmountPageModule)
  },
  {
    path: 'see-account',
    loadChildren: () => import('./pages/see-account/see-account.module').then( m => m.SeeAccountPageModule)
  },
  {
    path: 'add-team',
    loadChildren: () => import('./pages/add-team/add-team.module').then( m => m.AddTeamPageModule)
  },
  {
    path: 'team-detail',
    loadChildren: () => import('./pages/team-detail/team-detail.module').then( m => m.TeamDetailPageModule)
  },  {
    path: 'sidebar',
    loadChildren: () => import('./pages/sidebar/sidebar.module').then( m => m.SidebarPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
