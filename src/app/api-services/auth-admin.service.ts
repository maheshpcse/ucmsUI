import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './api-url.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class AuthAdminService {

	public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

	constructor(
		private http: HttpClient,
        public router: Router
	) { }

	// ******************* Mysql Database *****************************

    // ADMIN authentication API Service's
    adminLogin(data?: any) {
        return this.http.post<any>(APIURL.ADMIN_LOGIN, data);
    }

	adminReSignIn(data?: any) {
        return this.http.post<any>(APIURL.ADMIN_RESIGNIN, data);
    }

    checkValidateLogin() {
        return this.http.get<any>(APIURL.CHECK_VALIDATE_ADMIN_LOGIN);
    }

    getLoginId(role?: any) {
		return sessionStorage.getItem(`${role}_id`);
    }

    getLoginRole() {
        return sessionStorage.getItem('role');
    }

	getLoginToken() {
        return sessionStorage.getItem('token');
    }

    getLoginPayload() {
        const authToken = this.getLoginToken();
        if (authToken) {
            return JSON.parse(atob(authToken.split('.')[1]));
        } else {
            return null;
        }
    }

    getAdminProfileById(id?: any) {
        return this.http.get<any>(APIURL.GET_ADMIN_PROFILE_BY_ID + `/${Number(id)}`);
    }

    updateAdminPassword(data?: any) {
        return this.http.put<any>(APIURL.ADMIN_CHANGE_PASSWORD, data);
    }

    updateAdminProfileData(data?: any) {
        if (data['user_section'] == 1) {
            let formData: any = new FormData();
			formData.append('profile', data['profile']);
			formData.append('user_id', data['user_id']);
			formData.append('user_section', data['user_section']);
			// formData.append('user_data', data['user_data']);
            return this.http.put<any>(APIURL.UPDATE_ADMIN_PROFILE_DATA + `/${data['user_id']}`, formData);
        } else {
            return this.http.put<any>(APIURL.UPDATE_ADMIN_PROFILE_DATA + `/${null}`, data);
        }
    }

    isLoggedIn(role?: any): boolean {
        const loginPayload = this.getLoginPayload();
        // console.log('loginPayload isss:', loginPayload);
        
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const issuedTime = sessionStorage.getItem('issued');
        const expiresTime = sessionStorage.getItem('expired');
        // console.log('currentTime isss:', currentTime);
        // console.log('issuedTime isss:', issuedTime);
        // console.log('expiresTime isss:', expiresTime);

        if (loginPayload && expiresTime) {
            return expiresTime > currentTime;
            // return loginPayload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    isLoggedOut(role?: any) {
        localStorage.clear();
        sessionStorage.clear();
        if (role) {
            this.router.navigate([`/${role}/login`]);
        } else {
            this.router.navigate(['/admin/login']);
        }
    }
}
