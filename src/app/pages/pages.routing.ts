import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'pages',
    component: PagesComponent,
	  canActivate: [AuthGuard],
    children: [
      { path: 'leads', loadChildren: './leads/leads.module#LeadsModule' },
    ]
  }
];

export const PagesRouting: ModuleWithProviders = RouterModule.forChild(routes);
