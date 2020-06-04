import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadService } from '../leads.service';
import { UserService } from '../../../shared/user.service';
import { GenericSort } from '../../../shared/pipes/generic-sort.pipe';
import { CacheService } from '../../../shared/cache.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-leads.component.html',
  styleUrls: ['./create-leads.component.scss']
})
export class CreateLeadComponent implements OnInit {
  todaysDate;
  showLoader = false;
  cardTitle = 'CREATE NEW LEAD';
  isViewOnly = false;
  isEditOnly = false;
  createLead;
  commentList = [];
  allCustomer = [];
  allStatus = [];
  allLeadSource = [];
  allCities = [];
  allState = [];
  allLeadTypes = [];
  totalCities = [];
  userID = '';
  LeadID = 0;

  constructor(protected userService: UserService, private leadService: LeadService,
    private router: Router, private activatedRoute: ActivatedRoute,
    protected cacheService: CacheService, protected modalService: NgbModal,
    private notification: NotificationsService, private genericSort: GenericSort) { }

    ngOnInit() {
      const now = new Date();
      this.userID = localStorage.getItem('UserLoginId');
      this.todaysDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
      this.createLead = this.leadService.getLeadObject();
      this.createLead = JSON.parse(JSON.stringify(this.createLead));
      this.createLead.LeadDate = '';
      this.createLead.FollowUpDate = '';
      this.createLead.LeadNo = '';
      this.createLead.LeadSourceId = 0;
      this.createLead.CustomerName = '';
      this.createLead.ShopName = '';
      this.createLead.LeadType = 0;
      this.createLead.LeadStatus = 0;
      this.createLead.PhoneNo = '';
      this.createLead.Qunatity = '';
      this.createLead.Address = '';
      this.createLead.State = 0;
      this.createLead.City = 0;
      this.createLead.ZipCode = '';
      this.createLead.Comment = '';
      this.getMasterData();
      const activatedRouteObject = this.activatedRoute.snapshot.data;
      if(activatedRouteObject['viewMode'] === true) {
        this.isViewOnly = true;
        this.cardTitle = 'VIEW LEAD'
        const leadId = this.activatedRoute.snapshot.params.leadId;
        this.LeadID = leadId;
        this.getDetails(leadId);
      } else if(activatedRouteObject['editMode'] === true) {
        this.isEditOnly = true;
        this.cardTitle = 'EDIT LEAD'
        const leadId = this.activatedRoute.snapshot.params.leadId;
        this.LeadID = leadId;
        this.getDetails(leadId);
      }
    }
    getMasterData() {
      this.showLoader = true;
      this.leadService.getMasterData().subscribe(res => {
        this.showLoader = false;
        let lookUpData = JSON.parse(JSON.stringify(res));
        this.allCustomer = lookUpData.Customer;
        this.allStatus = lookUpData.LeadStatus.filter(x=> (x.LeadStatusID == 31 || x.LeadStatusID == 32));
        this.allState = lookUpData.State;
        this.allLeadSource = lookUpData.LeadSource;
        this.totalCities = lookUpData.City;
        this.allLeadTypes = lookUpData.LeadType;
      },(error)=> {
        this.showLoader = false;
        this.notification.error('Error','Error While Lookup Master Data');
      })
    }
    getDetails(id) {
      this.showLoader = true;
      this.leadService.getLeadDetails(id,this.userID).subscribe(res => {
        this.showLoader = false;
        const resp = JSON.parse(JSON.stringify(res));
        this.populateAllData(resp);
      },(err) => {
        this.showLoader = false;
      })
    }
    populateAllData(resp) {
      if(resp.Lead.length) {
        let allValues = resp.Lead[0];
        const leadDateArray = allValues.LeadDate.split('/');
        const followupDateArray = allValues.FollowUPDate.split('/')
        this.createLead.LeadDate = { year: +leadDateArray[2], month: +leadDateArray[0], day: +leadDateArray[1] };
        this.createLead.FollowUpDate = { year: +followupDateArray[2], month: +followupDateArray[0], day: +followupDateArray[1] };
        this.createLead.LeadNo = allValues.LeadNumber;
        this.createLead.LeadSourceId = allValues.LeadSourceID;
        this.createLead.CustomerName = allValues.CustomerName;
        this.createLead.ShopName = allValues.ShopName;
        this.createLead.LeadType = allValues.LeadTypeID;
        this.createLead.LeadStatus = allValues.LeadStatusID;
        this.createLead.PhoneNo = allValues.Phone;
        this.createLead.Qunatity = allValues.Quantity;
        this.createLead.Address = allValues.Address;
        this.createLead.State = allValues.StateID;
        this.refreshDataHandler('statechange');
        this.createLead.City = allValues.CityID;
        this.createLead.ZipCode = allValues.Zip;
        this.createLead.Comment = '';
      }
      this.commentList = resp.LeadComment;
    }
  
    refreshDataHandler(byType: any = '') {
      if(byType === "statechange"){
        this.allCities = this.totalCities.filter(x=> x.StateID == this.createLead.State);
      }
    }

    validateData() {
      if(this.createLead.LeadDate != '' && this.createLead.FollowUpDate != '' && this.createLead.LeadType != 0 && this.createLead.LeadSourceId != 0
        && this.createLead.LeadStatus != 0 && this.createLead.CustomerName != '' && this.createLead.PhoneNo != ''
        && this.createLead.ShopName != '' && this.createLead.Qunatity != '' && this.createLead.Address != ''
        && this.createLead.State != 0 && this.createLead.City != 0 && this.createLead.ZipCode != '') {
          return true;
        }
      return false;
    }
    goToListPage() {
      this.router.navigate(['/pages/leads/list']);
    }
    submitLead() {
      if(!this.validateData()) {
        this.notification.error('Error', 'Please fill all the mandatory information !!!')
        return;
      }
      let postData = {
        "LeadID": this.LeadID,
        "LeadDate": `${this.createLead.LeadDate.month}/${this.createLead.LeadDate.day}/${this.createLead.LeadDate.year}`,
        "FollowupDate": `${this.createLead.FollowUpDate.month}/${this.createLead.FollowUpDate.day}/${this.createLead.FollowUpDate.year}`,
        "CustomerName": this.createLead.CustomerName,
        "Address": this.createLead.Address,
        "Zip": this.createLead.ZipCode,
        "StateID": this.createLead.State,
        "CityID": this.createLead.City,
        "Phone": this.createLead.PhoneNo,
        "LeadTypeID": this.createLead.LeadType,
        "Quantity": this.createLead.Qunatity,
        "LeadSourceID": this.createLead.LeadSourceId,
        "ShopName": this.createLead.ShopName,
        "LeadStatusID": this.createLead.LeadStatus,
        "UserID": this.userID,
        "Comment": this.createLead.Comment
      }
      this.showLoader = true;
      this.leadService.createLead(postData).subscribe(res => {
        this.showLoader = false;
        const resp = JSON.parse(JSON.stringify(res));
        if(resp.Error[0].ERROR == 0) {
          this.notification.success('Success', resp.Error[0].Msg);
          this.router.navigate(['pages/leads/list']);
        } else {
          this.notification.error('Error', resp.Error[0].Msg);
        }
      }, err => {
        this.showLoader = false;
        this.notification.error('Error', 'Something went wrong!');
      })
    }
}