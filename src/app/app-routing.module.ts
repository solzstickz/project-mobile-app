
import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';

const routes: Routes = [
  
  // {
  //   path: 'cre-project',
  //   loadChildren: () => import('./cre-project/cre-project.module').then( m => m.CreProjectPageModule)
  // },
 
    { 
      path: '', loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    
  
    },
    {
      path: 'app',
      loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule) 
    },

    {
      path: 'reportdetail',
      loadChildren: () => import('./pages/report/reportdetail/reportdetail.module').then( m => m.ReportdetailPageModule) 
    },
 

    // { 
    //   path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  
    // },
    
    // {
    //   path: 'login',
    //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    // },
    // {
    //   path: 'register',
    //   loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
    // },
    // {
    //   path: 'forgot-password',
    //   loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
    // },
   
  // {
  //   path: 'reportdetail',
  //   loadChildren: () => import('./pages/report/reportdetail/reportdetail.module').then( m => m.ReportdetailPageModule)
  // },
 
   
 

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
