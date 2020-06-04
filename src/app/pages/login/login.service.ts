import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from '../../shared/user.service';
import {CacheService} from '../../shared/cache.service';


@Injectable()
export class LoginService {
    API_ENDPOINT = environment.apiEndpoint;

    constructor(private http: HttpClient, private userService: UserService,private cacheService:CacheService) {}
    userInfo: any;

    login(data: any): Observable<any> {
        // const headers = new HttpHeaders();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:4203');
        // headers.append('Access-Control-Allow-Credentials', 'true');
        // const options = { 'headers': headers };
        return this.http.post(`${this.API_ENDPOINT}api/LoginAuth`, data).pipe(map((res) => {
		   // this.userInfo = res;
           // localStorage.setItem('auth_token', 'gjhasdgfkjaghfjkhklahflkash');
           // localStorage.setItem('userId', res['UserID']);
           // localStorage.setItem('user_token', JSON.stringify(res));
            return res;
        }));
    }

    forgetPassword(data: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const options = { 'headers': headers };
        return this.http.post(`${this.API_ENDPOINT}api/account/forgetpassword`, data, options)
        .pipe(map(res => {
           return res;
          })
        );     
    }

    signOut() {
        this.cacheService.deleteCache();
		localStorage.clear();
    }
}
