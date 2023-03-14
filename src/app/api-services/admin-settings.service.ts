import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './api-url.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class AdminSettingsService {

	public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

	constructor(
		private http: HttpClient,
        public router: Router
	) { }

	// ******************* Mysql Database *****************************

    // ADMIN settings API Service's

    getAdminSettingsHistoryData(data?: any) {
        return this.http.post<any>(APIURL.GET_ADMIN_SETTINGS_HISTORY_DATA, data);
    }
}
