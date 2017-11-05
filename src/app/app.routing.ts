import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import {AuthGuard} from './_guard/auth.guard'

export const routes: Routes = [
  {
    path: '',
    // redirectTo: 'dashboard',
    redirectTo: 'pages/audience',
    // redirectTo: 'pages/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'pages/login',
    // redirectTo: 'contents',
    // redirectTo: 'pages/login',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
