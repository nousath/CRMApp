import { Component } from '@angular/core';
import {LeadService } from './leads.service';
import { UserService } from '../../shared/user.service';

@Component({
    selector: '',
    template: `<router-outlet></router-outlet>`
})

export class LeadsComponent {
    constructor(private leadService: LeadService, private userService: UserService) { 
        const now = new Date();
        let leadListTask = this.leadService.getLeadObject();
        let createLeadTask = this.leadService.getLeadObject();
        leadListTask.startDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        leadListTask.endDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        leadListTask.CustomerName = '';
        leadListTask.Status = '';

        createLeadTask.startDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        createLeadTask.endDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        createLeadTask.CustomerName = '';
        createLeadTask.Status = '';
    }
	
}