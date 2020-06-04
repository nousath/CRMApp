import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class PagesService {
    API_ENDPOINT = environment.apiEndpoint;
    constructor(private http: HttpClient) {}
    getFollowUpList() {
        return this.http.get(`${this.API_ENDPOINT}api/CRMLeadFollowList`).pipe(map( res => res));
    }
}