import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'account/:id',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'forum',
    loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'register/:completeProfile',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules
})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
