import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Login } from './login.component';

export const routes: Routes = [{ path: '', component: Login }];

export const LoginRouting: ModuleWithProviders = RouterModule.forChild(routes);
