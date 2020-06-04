import { RouterModule, Routes } from "@angular/router";
import { LeadsComponent } from './leads.component';
import { LeadsListComponent } from "./leads-list/leads-list.component";
import { CreateLeadComponent } from './create-leads/create-leads.component';

const route: Routes = [
    {
        path: '',
        component: LeadsComponent,
        children: [
            {
              path: 'create',
              component: CreateLeadComponent,
            },
            {
              path: 'list',
              component: LeadsListComponent,
            },
            {
              path: 'edit/:leadId',
              component: CreateLeadComponent,
              data: {editMode: true},
            },
            {
              path: 'view/:leadId',
              component: CreateLeadComponent,
              data: {viewMode: true},
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            }
        ]
    }
];
export const LeadsRouting = RouterModule.forChild(route);