import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LeadsListComponent } from './leads-list/leads-list.component';
import { LeadsRouting } from './leads.routing';
import { SharedModule } from '../../shared/shared.module';
import { NgaModule } from '../../theme/nga.module';
import { GenericSort } from '../../shared/pipes/generic-sort.pipe';
import { LeadService } from './leads.service';
import { LeadsComponent } from './leads.component';
import { CreateLeadComponent } from './create-leads/create-leads.component';

@NgModule({
  imports: [
    CommonModule,
    LeadsRouting,
    FormsModule,
    SharedModule,
    NgbModule,
    NgaModule
  ],
  declarations: [LeadsListComponent, CreateLeadComponent,LeadsComponent],
  providers: [LeadService, GenericSort]
})
export class LeadsModule { }
