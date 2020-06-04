
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService extends HttpClient {
    
    API_ENDPOINT = environment.apiEndpoint;
    constructor(backend: HttpXhrBackend, private router: Router, private http: HttpClient) {
        super(backend);
    }
    public get(endPoint: string, options?: any): Observable<any> {
        return this.http.get(this.API_ENDPOINT + endPoint, options);
      }
    
    public post(endPoint: string, params: Object, options?: any): Observable<any> {
        return this.http.post(this.API_ENDPOINT + endPoint, params, options);
      }
    

    public put(endPoint: string, params: Object, options?: any): Observable<any> {
        return this.http.put(this.API_ENDPOINT + endPoint, params, options);
      }
    
    public delete(endPoint: string, options?: any): Observable<any> {
        return this.http.delete(this.API_ENDPOINT + endPoint, options);
      }
}
