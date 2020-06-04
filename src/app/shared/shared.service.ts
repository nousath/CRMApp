
import {map} from 'rxjs/operators';
import { IOption } from './components/multiple-select/multiple-select';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';

@Injectable()
export class SharedService {
	logedInUser: any = {};

    constructor(protected http: HttpService, private cacheService: CacheService) { }
    // quickBookpassApprovedTicketIds(ticketsIds): Observable<any[]> {
    //     let url = `api/quickbooks/getapprovedtickets`;
    //     return this.http.post(url, ticketsIds).pipe(map((res) => res));
    // }
	getCMMasterLookupData() {
		if (this.cacheService.has("CMMasterLookupData")) { return this.cacheService.get("CMMasterLookupData"); }
		return this.http.get(`api/CustomerMaintenance/GetCMMasterLookupData`).pipe(
		map((res) => {
			let masterData = res;
		    this.cacheService.set("CMMasterLookupData", masterData);
		    return masterData;
		}));
    }
    getNotApprovedTrips(): Observable<any> {
		const url = `api/trip/all?tripDate=1900-01-01&branchId=1&ISRI=true&TripState=0`;
        return this.http.get(url).pipe(map(res => res));
    }
	getCustomerselectLookupData(customerId){
		 return this.http.get(`api/CustomerMaintenance/GetRequestforSelectedCustomer?CustomerID=${customerId}`).pipe(
		map((res) => {
			let masterData = res;
		    return masterData;
		}));
    }
    getBranches(userId): Observable<any> {
		
        if (this.cacheService.has("branches")) { return this.cacheService.get("branches"); }
        return this.http.get(`api/LoggedInUserBranches`).pipe(map((res) => {
			let branchDataSet:any = [];
			branchDataSet = this.transformOptionsReddySelect(res.Branch, 'BranchID', 'BranchCode', 'BranchName');
			branchDataSet.unshift({"value":0,"label":"Select Business Unit"});
            this.cacheService.set("branches", branchDataSet);
            return branchDataSet;
        }),);
    }

    getAllDriver(): Observable<any> {
		
		if (this.cacheService.has("driverscache")) { 
		
		return this.cacheService.get("driverscache"); }
        return this.http.get(`api/getAllDriver`).pipe(map((res) => {
            let driverUser:any[] = res.User;
            let driverDataset:any = [];
            driverDataset = this.transformOptionsdriverSelect(driverUser, 'UserId', 'FirstName', 'LastName');
            driverDataset.unshift({"value":0,"label":"Select Driver","data":{'UserId':0,'FirstName':'Select','LastName':'Driver'}});//,data:{'BranchID':null}
            this.cacheService.set("driverscache", driverDataset);
            return driverDataset;
		}),);
		
	}
	transformOptionsdriverSelect(options: Array<any>, value: string, label_1: string, label_2?: string, delimitter: string = ' ') {
        let tmpArr: Array<IOption> = [];
        options.forEach((option) => {
            tmpArr.push({
                value: option[value],
                label: label_2 ? `${option[label_1]} ${delimitter} ${option[label_2]}` : option[label_1],
                data: option
            })
        })
        return tmpArr;
    }
	
    uploadFile(file): Observable<any> {
        return this.http.post(`api/manualticket/uploadImage`, file).pipe(map(res => res));
    }

    updateFile(file): Observable<any> {
        return this.http.put(`api/manualticket/updateImage?ImageID=${file.ImageID}`, file).pipe(map(res => res));
    }

    getDistributerAndCopacker(): Observable<any> {
		
        if (this.cacheService.has("distributorcopacker")) {
		return this.cacheService.get("distributorcopacker");
		}
        return this.http.get('api/LoggedInUserDistributors').pipe(map((res) => {
			let distributors = this.transformOptionsReddySelect(res.DistributorCpoacker, 'DistributorCopackerID', 'Name');
			distributors.unshift({"value":0,"label":"Select Distributor/Copacker"});
            this.cacheService.set("distributorcopacker", distributors);
            return distributors;
        })
        );
    }

    getDistributors(userId, selectedDate) {
        return this.http.get(`api/trip/listofdistributorfordate?Id=${userId}&Date=${selectedDate}`).pipe(
            map((res) => {
                return res;
            }));
    }

    getBranchesByDate(userId, selectedDate) {
        return this.http.get(`api/trip/listofbranchesfordate?Id=${userId}&Date=${selectedDate}`).pipe(
            map((res) => {
                return res;
            }));
    }

    formatDate(date) {
        if (!date.year) { return '' };
        let yy = date.year, mm = date.month, dd = date.day;
        if (mm < 10) { mm = '0' + mm }
        if (dd < 10) { dd = '0' + dd }
        return yy + '-' + mm + '-' + dd;

    }

    transformOptionsReddySelect(options: Array<any>, value: string, label_1: string, label_2?: string, delimitter: string = '-') {
        let tmpArr: Array<IOption> = [];
        options.forEach((option) => {
            tmpArr.push({
                value: option[value],
                label: label_2 ? `${option[label_1]} ${delimitter} ${option[label_2]}` : option[label_1],
                data: option
            })
        })
        return tmpArr;
    }
	getDriverByBranch(searchDate,branchId, isInternal): Observable<any> {
		if (this.cacheService.has("drivers")) { return this.cacheService.get("drivers"); }
        return this.http.get(`api/user?CreateDate=${searchDate}&driverlistbybranch=${branchId}&isInternal=${isInternal}`).pipe(map((res) => {
            let driverUser:any[] = res.User;
            let driverDataset:any = [];
            driverUser.unshift({ 'UserId': 1, 'FirstName': 'All', 'LastName': 'Drivers' });
            driverDataset = this.transformOptionsReddySelect(driverUser, 'UserId', 'FirstName', 'LastName');
            
            this.cacheService.set("drivers", driverDataset);
            return driverDataset;
		}));
		
	}
    getTicketType(isSaleTicket: boolean, customer: any, ticketTypeId: number, Is_PBM_DSD: number = 0, EDIUserName: boolean = false) {
        if (ticketTypeId === 29) {
            return 'DNS'
        } else if (ticketTypeId === 28) {
            return 'Payment Only'
        } else if (ticketTypeId === 30) {
            return 'Void'
        } else if (ticketTypeId === 110) {
            return 'Sale & Credit';
        } else if (customer.CustomerType === 20) {
            if (ticketTypeId === 26) {
                return 'Sale';
            } else {
                return 'Credit';
            }
        } else if (customer.CustomerType === 22) {
            if (isSaleTicket && ticketTypeId === 26) {
                return Is_PBM_DSD === 20 ? 'Sale' : 'PBM - Sale';
            } else if (isSaleTicket && ticketTypeId === 27) {
                return Is_PBM_DSD === 20 ? 'Credit' : 'PBM - Credit';
            } else {
                return 'PBM - Cons';
            }
        } else if (EDIUserName) {
            if (ticketTypeId === 26) {
                return 'PBS - Sale';
            } else {
                return 'PBS - Credit';
            }
        } else {
            return 'PBS - Cons';
        }
    }
    date_diff_indays(date1, date2) {
		var dt1 = new Date(date1);
		var dt2 = new Date(date2);
		return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
	}
    getCurrentDate() {
        var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd = Number('0'+ String(dd));
            } 
            if(mm<10) {
                mm = Number('0'+ String(mm));
            } 
            var todayformat = mm + '/' + dd + '/' + yyyy;
            return todayformat;
    }
    checkPasswordExpiration(passExpDate) {
            var current_date = this.getCurrentDate();
            var exdate = passExpDate && passExpDate.split(" ");
            var exdateDate = exdate && exdate[0];
            var total_days = this.date_diff_indays(current_date, exdateDate);
            return total_days;
    }
}
